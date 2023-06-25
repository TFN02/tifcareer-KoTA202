<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Application;
use App\Models\Applicant;
use App\Models\Job;
use App\Models\WeightingCriteria;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ApplicationController extends Controller
{
    private int $applicant_id;
    private int $job_id;

    public function index(Request $request)
    {
        $application = Application::with('job', 'applicant', 'videoResume');

        if ($request->applicant_id) {
            $this->applicant_id = $request->applicant_id;
            $application = $application->whereHas('applicant', function ($query) {
                $query->where('applicant_id', $this->applicant_id);
            });
        }
        if ($request->job_id) {

            $this->job_id = $request->job_id;
            $application = $application->whereHas('job', function ($query) {
                $query->where('job_id', $this->job_id);
            });
            return response()->json([
                'success' => true,
                'data' => $application->get(),
            ]);
        }

        if ($request->order_by && $request->order_type) {
            $application = $application->orderBy($request->order_by, $request->order_type);
        } else {
            $application = $application->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $application->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'applicant_id' => 'required|int',
            'job_id' => 'required|int',
        ]);

        if ($request->job_id) {
            $job = Job::findOrFail($request->job_id);
        }
        if ($request->applicant_id) {
            $applicant = Applicant::with('education', 'workExperience', 'skill', 'interestArea', 'softSkill', 'certificate')->find($request->applicant_id);
        }

        $currentTime = Carbon::now();

        if ($job->id && $applicant->id) {
            $application = Application::create([
                'applicant_id' => $applicant->id,
                'job_id' => $job->id,
                'education' => $applicant->education,
                'work_experience' => $applicant->workExperience,
                'skill' => $applicant->skill,
                'interest_area' => $applicant->interestArea,
                'soft_skill' => $applicant->softSkill,
                'certificate' => $applicant->certificate,
                'is_selection_1' => 1,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' =>  $application,
        ]);
    }

    public function show($id)
    {
        $application = Application::with('job', 'applicant', 'videoResume')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $application,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $application = Application::find($id);

            if (!$application) {
                // Jika tidak ditemukan aplikasi dengan ID yang sesuai, kembalikan respons error
                return response()->json(['error' => 'Aplikasi tidak ditemukan'], 404);
            }

            $application->update($request->all());

            // Jika berhasil diperbarui, kirimkan respons dengan aplikasi yang telah diperbarui
            return response()->json($application);
        } catch (\Exception $e) {
            // Tangani kesalahan yang terjadi
            return response()->json(['error' => 'Terjadi kesalahan'], 500);
        }
    }

    public function getAcceptedApplications(Request $request)
    {
        try {
            $jobId = $request->input('job_id');
            $applications = Application::join('applicants', 'applications.applicant_id', '=', 'applicants.id')
                ->select('applications.*', 'applicants.name as applicant_name')
                ->where('applications.is_pass_selection_1', 1)
                ->where('applications.job_id', $jobId)
                ->get();

            return response()->json($applications);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }

    public function getApplications(Request $request)
    {
        $applicantId = $request->query('applicant_id');
        $jobId = $request->query('job_id');

        $applications = Application::where('applicant_id', $applicantId)
            ->where('job_id', $jobId)
            ->get();

        return response()->json($applications);
    }

    public function destroy($id)
    {
        $application = Application::find($id);
        $application->delete();

        return response()->json([
            'message' => 'Application deleted',
            'data' => $application,
        ]);
    }

    public function saw(Request $request, $id)
    {
        // Ambil data job berdasarkan job_id
        $job = Job::find($request->id);

        $applications = Application::where('job_id', $job->id)
            ->with('applicant', 'applicant.education', 'applicant.skill', 'applicant.workExperience', 'applicant.interestArea')
            ->get();

        $applicants = [];

        if (count($applications) > 0) {
            $weightingCriteria = WeightingCriteria::with('weightingVariable')
                ->where('job_id', $id)
                ->get();

            foreach ($applications as $application) {
                $applicant = $application->applicant;
                $totalScore = 0;
                foreach ($weightingCriteria as $criteria) {
                    $criteriaName = $criteria->name;
                    $criteriaWeight = $criteria->weight;

                    if ($criteriaName == 'education') {
                        $applicantEducations = $applicant->education->map(function ($education) {
                            return [
                                'level' => $education->level,
                                'major' => $education->major,
                            ];
                        });

                        $educationWeightingVariables = $criteria->weightingVariable->filter(function ($variable) use ($applicantEducations) {
                            return $applicantEducations->contains(function ($item) use ($variable) {
                                $name = json_decode($variable->name, true);
                                return $item['level'] === $name['level'] && $item['major'] === $name['major'];
                            });
                        });
                        $educationScore = 0;
                        foreach ($educationWeightingVariables as $educationWeightingVariable) {
                            $educationScore += $educationWeightingVariable->weight * $criteriaWeight;
                        }

                        $totalScore += $educationScore;
                    } elseif ($criteriaName === 'skill') {
                        $applicantSkills = $applicant->skill->pluck('name')->map('strtolower')->toArray();

                        $skillWeightVariables = $criteria->weightingVariable->filter(function ($variable) use ($applicantSkills) {
                            $nameSkill = json_decode($variable->name, true)['nameSkill'];
                            return in_array(strtolower($nameSkill), $applicantSkills);
                        });
                        $skillScore = 0;
                        foreach ($skillWeightVariables as $skillWeightVariable) {
                            $skillScore += $skillWeightVariable->weight  * $criteriaWeight;
                        }

                        $totalScore += $skillScore;
                    } elseif ($criteriaName === 'work_experience') {
                        $applicantWorkExperiences = $applicant->workExperience->map(function ($workExperience) {
                            $totalYears = $workExperience->end_year - $workExperience->start_year + 1;
                            return [
                                'position' => $workExperience->position,
                                'totalYears' => $totalYears,
                            ];
                        });

                        $workExperienceWeightingVariables = $criteria->weightingVariable->filter(function ($variable) use ($applicantWorkExperiences) {
                            return $applicantWorkExperiences->contains(function ($item) use ($variable) {
                                $name = json_decode($variable->name, true);
                                $year = intval($name['year']);
                                return $item['position'] === $name['position'] && $item['totalYears'] === $year;
                            });
                        });
                        $workExperienceScore = 0;
                        foreach ($workExperienceWeightingVariables as $workExperienceWeightingVariable) {
                            $workExperienceScore += $workExperienceWeightingVariable->weight * $criteriaWeight;
                        }

                        $totalScore += $workExperienceScore;
                    } elseif ($criteriaName === 'interest_area') {
                        $applicantInterestArea = $applicant->interestArea->pluck('name_of_field')->map('strtolower')->toArray();

                        $interestAreaWeightingVariables = $criteria->weightingVariable->filter(function ($variable) use ($applicantInterestArea) {
                            $nameOfInterest = json_decode($variable->name, true)['nameOfInterest'];
                            return in_array(strtolower($nameOfInterest), $applicantInterestArea);
                        });

                        $interestAreaScore = 0;
                        foreach ($interestAreaWeightingVariables as $interestAreaWeightingVariable) {
                            $interestAreaScore += $interestAreaWeightingVariable->weight * $criteriaWeight;
                        }
                        $totalScore += $interestAreaScore;
                    }
                }

                $application->score = $totalScore;
                $application->save();
            }

            $sortedApplications = $applications->sortByDesc('score');

            $ranking = 1;
            foreach ($sortedApplications as $application) {
                $application->rank = $ranking;
                $application->save();

                $applicants[] = [
                    'id' => $application->id,
                    'applicant_id' => $application->applicant->id,
                    'phone_no' => $application->applicant->phone_no,
                    'gender' => $application->applicant->gender,
                    'name' => $application->applicant->name,
                    'score' => $application->score,
                    'rank' => $ranking,
                    'is_pass_selection_1' => $application->is_pass_selection_1,
                ];

                $ranking++;
            }
        }else{
            
        }

        return $applicants;
    }

    public function getIdByApplyed($applicant_id, $job_id)
    {
        $application = Application::where('applicant_id', $applicant_id)->where('job_id', $job_id)->first();
        return response()->json([
            'success' => true,
            'application_id' => $application->id,
        ]);
    }

    public function passSelectionVideoResume($id, Request $request)
    {
        $application = Application::find($id);
        if($request->is_pass_selection_2 != null){
            $application->is_pass_selection_2 = $request->is_pass_selection_2;
            $application->save();
        }
       
        return response()->json([
            'success' => true,
            'application_id' => $application->id,
        ]);
    }
}

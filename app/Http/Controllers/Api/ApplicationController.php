<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Application;
use App\Models\Applicant;
use App\Models\Job;
use App\Models\WeightingCriteria;
use Illuminate\Http\Request;
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
                'send_date' => $currentTime
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
        $application = Application::findOrFail($id);

        if ($request->rank) {
            $application->rank = $request->input('rank');
        }
        if ($request->score) {
            $application->score = $request->input('score');
        }
        if ($request->status) {
            $application->status = $request->input('status');
        }

        $application->save();

        return response()->json([
            'success' => false,
            'data' => $application,
        ]);
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

    public function applyJob(Request $request, $id)
    {
        // Ambil data job berdasarkan job_id
        $job = Job::find($request->id);

        // Ambil data pelamar yang telah melamar pada job_id tersebut
        $applications = Application::where('job_id', $id)
            ->with('applicant', 'applicant.education', 'applicant.skill', 'applicant.workExperience', 'applicant.interestArea')
            ->get();

        $applicants = [];

        if (count($applications) > 0) {
            // Ambil data kriteria bobot dari job tersebut
            $weightingCriteria = WeightingCriteria::with('weightingVariable')
                ->where('job_id', $id)
                ->get();


            // Lakukan perangkingan
            foreach ($applications as $application) {
                $applicant = $application->applicant;
                $totalScore = 0;


                foreach ($weightingCriteria as $criteria) {

                    $criteriaName = $criteria->name;
                    $criteriaWeight = $criteria->weight;

                    // Periksa data aplikasi berdasarkan kriteria dan variabel bobot
                    if ($criteriaName == 'education') {

                        $applicantEducations = $applicant->education->pluck('level')->all();
                        $educationWeightingVariables = $criteria->weightingVariable->whereIn('name', $applicantEducations);
                        $educationScore = 0;

                        foreach ($educationWeightingVariables as $educationWeightingVariable) {
                            $educationScore += $educationWeightingVariable->weight * $criteriaWeight;
                        }

                        // return response()->json([
                        //     'eduWeight' => $educationScore
                        // ]
                        // );

                        $totalScore += $educationScore;

                    } elseif ($criteriaName === 'skill') {

                        $applicantSkill = $applicant->skill->pluck('name')->all();
                        $skillWeightVariables = $criteria->weightingVariable->filter(function ($variable) use ($applicantSkill) {
                            return in_array(strtolower($variable->name), array_map('strtolower', $applicantSkill));
                        });

                        $skillScore = 0;

                        foreach ($skillWeightVariables as $skillWeightVariable) {
                            $skillScore += $skillWeightVariable->weight * $criteriaWeight;
                        }
                        $totalScore += $skillScore;


                    } elseif ($criteriaName === 'work_experience') {

                        $applicantWorkExperience = $applicant->workExperience->pluck('position')->all();
                        // $workExperienceVariables = $criteria->weightingVariable->whereIn('name', $applicantWorkExperience);

                        $workExperienceVariables = $criteria->weightingVariable->filter(function ($variable) use ($applicantWorkExperience) {
                            return in_array(strtolower($variable->name), array_map('strtolower', $applicantWorkExperience));
                        });

                        $workExperienceScore = 0;

                        foreach ($workExperienceVariables as $workExperienceVariable) {
                            $workExperienceScore += $workExperienceVariable->weight * $criteriaWeight;
                        }
                        $totalScore += $workExperienceScore;


                    } elseif ($criteriaName === 'interest_area') {

                        $applicantInterestArea = $applicant->interestArea->pluck('name_of_field')->all();
                        // $interestAreaWeightingVariables = $criteria->weightingVariable->whereIn('name', $applicantInterestArea);

                        $interestAreaWeightingVariables = $criteria->weightingVariable->filter(function ($variable) use ($applicantInterestArea) {
                            return in_array(strtolower($variable->name), array_map('strtolower', $applicantInterestArea));
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
                    'id' => $application->applicant->id,
                    'name' => $application->applicant->name,
                    'score' => $application->score,
                    'rank' => $ranking,
                ];

                $ranking++;
            }
        }


        return $applicants;

        // return response()->json([
        //     'applicant' => $applicants,
        //     'edu' => $applicantEducation,
        //     'interest_area' => $applicantInterestArea,
        //     'work_experience' => $applicantWorkExperience,
        //     'skill' => $applicantSkill
        // ]
        // );
    }
}

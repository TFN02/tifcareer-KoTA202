<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Application;
use App\Models\Applicant;
use App\Models\Job;
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
        $ranking = 1;

        // Periksa jika ada pelamar yang telah melamar pada job_id tersebut
        if (count($applications) > 0) {
            // Ambil data kriteria bobot dari job tersebut
            $weightingCriteria = $job->weightingCriteria()->get();

            // Lakukan perangkingan
            foreach ($applications as $application) {
                $applicant = $application->applicant;
                $totalScore = 0;

                foreach ($weightingCriteria as $criteria) {
                    $criteriaName = $criteria->name;
                    $criteriaWeight = $criteria->weight;

                    // Periksa data aplikasi berdasarkan kriteria dan variabel bobot
                    switch ($criteriaName) {
                        case 'education':
                            $applicantEducation = $applicant->education->first()->pivot->level;
                            $educationWeightingVariable = $criteria->weightingVariable()->where('name', $applicantEducation)->first();
                            if ($educationWeightingVariable) {
                                $educationScore = $educationWeightingVariable->weight * $criteriaWeight;
                                $totalScore += $educationScore;
                            }
                            break;

                        case 'skill':
                            $applicantSkill = $applicant->skill->first()->pivot->name;
                            $skillWeightingVariable = $criteria->weightingVariable()->where('name', $applicantSkill)->first();
                            if ($skillWeightingVariable) {
                                $skillScore = $skillWeightingVariable->weight * $criteriaWeight;
                                $totalScore += $skillScore;
                            }
                            break;

                        case 'work_experience':
                            $applicantWorkExperience = $applicant->workExperience->first()->positon;
                            $workExperienceWeightingVariable = $criteria->weightingVariable()->where('name', $applicantWorkExperience)->first();
                            if ($workExperienceWeightingVariable) {
                                $workExperienceScore = $workExperienceWeightingVariable->weight * $criteriaWeight;
                                $totalScore += $workExperienceScore;
                            }
                            break;

                        case 'interest_area':
                            $applicantInterestArea = $applicant->interestArea->first()->pivot->name_of_field;
                            $interestAreaWeightingVariable = $criteria->weightingVariable()->where('name', $applicantInterestArea)->first();
                            if ($interestAreaWeightingVariable) {
                                $interestAreaScore = $interestAreaWeightingVariable->weight * $criteriaWeight;
                                $totalScore += $interestAreaScore;
                            }
                            break;
                    }
                }

                $application->score = $totalScore;
                $application->rank = $ranking;
                $application->save();

                $applicants[] = [
                    'id' => $applicant->id,
                    'name' => $applicant->name,
                    'score' => $totalScore,
                    'rank' => $ranking,
                ];

                $ranking++;
            }
        }

        // Lakukan perangkingan berdasarkan total score
        usort($applicants, function ($a, $b) {
            return $b['score'] <=> $a['score'];
        });

        return $applicants;
    }

}

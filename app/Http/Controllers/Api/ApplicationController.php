<?php

namespace App\Http\Controllers\Api;


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
        $application = Application::with('job','applicant', 'videoResume') ;

        if($request->applicant_id){
            $this->applicant_id = $request->applicant_id;
            $application = $application->whereHas('applicant', function($query){
                            $query->where('applicant_id', $this->applicant_id);
            });
        }
        if($request->job_id){
            
            $this->job_id = $request->job_id;
            $application = $application->whereHas('job', function($query){
                            $query->where('job_id', $this->job_id);
            });
            return response()->json([
                'success' => true,
                'data' => $application->get(),
            ]);
        }

        if($request->order_by && $request->order_type){
            $application = $application->orderBy($request->order_by, $request->order_type);
        }else{
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

        if($request->job_id){
            $job = Job::findOrFail($request->job_id);
            $job_id = $job->id;
        }
        if($request->applicant_id){
            $applicant = Applicant::with('education','workExperience', 'skill', 'interestArea', 'softSkill', 'certificate')->find($request->applicant_id);

        }

        if($job->id && $applicant->id){
            $application = Application::create([
                'applicant_id' => $applicant->id,
                'job_id' => $job->id,
                'education' => $applicant->education,
                'work_experience' => $applicant->workExperience,
                'skill' => $applicant->skill,
                'interest_area' => $applicant->interestArea,
                'soft_skill' => $applicant->softSkill,
                'certificate' => $applicant->certificate,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' =>  $application,
        ]);
    }

    public function show($id)
    {
        $application = Application::with('job','applicant', 'videoResume')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $application,
        ]);
    }

    public function update(Request $request, Application $application)
    {
        return response()->json([
            'success' => false,
            'data' => "Disable for this method",
        ]);
    }

    public function destroy($id)
    {
        $application = Application::find($id);
        $application->delete();

        return response()->json([
            'message' => 'Work Experience deleted',
            'data' => $application,
        ]);
    }
}

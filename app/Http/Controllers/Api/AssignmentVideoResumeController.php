<?php

namespace App\Http\Controllers\Api;

use App\Models\AssignmentVideoResume;
use App\Models\Question;
use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Application;

class AssignmentVideoResumeController extends Controller
{
    private int $job_id;
    private int $assignment_video_resume_id;

    public function index(Request $request)
    {
        $asr = AssignmentVideoResume::with('job', 'question', 'application');

        if($request->job_id){
            $this->job_id = $request->job_id;
            $asr = $asr->whereHas('job', function($query){
                            $query->where('job_id', $this->job_id);
            });
        }

        if($request->order_by && $request->order_type){
            $asr = $asr->orderBy($request->order_by, $request->order_type);
        }else{
            $asr = $asr->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $asr->get(),
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'job_id' => 'required|int',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'technical_requirement' => 'required|string',
        ]);

        if($request->job_id){
            $job = Job::find($request->job_id);
            $job_id = $job->id;
        }

        $asr = AssignmentVideoResume::create([
            'job_id' => $job_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'technical_requirement' => $request->technical_requirement,
        ]);

        if($request->question){
            $questions = $request->question;
            // dd($questions);
            foreach($questions as $que){
                $asr->question()->create([
                    'question' => $que['question'],
                    'assignment_video_resume_id' => $asr->id,
                ]);

            }
        }

        if($request->application){
            $applications = $request->application;
            foreach($applications as $appl){
                $application = Application::find($appl['application_id']);
                $application->assignment_video_resume_id = $asr->id;
                $application->save();
            }
        }


        return response()->json([
            'success' => true,
            'data' =>  $asr,
        ]);
    }

    public function show($id)
    {
        $asr = AssignmentVideoResume::with('job', 'question', 'application')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $asr
        ]);
    }

    public function update(Request $request, $id)
    {
        $asr = AssignmentVideoResume::findOrFail($id); 
            
        if($request->job_id){
            $job = Job::find($request->job_id);
            $asr->job_id = $job->id;
        }

        if($request->start_date){
            $asr->start_date = $request->input('start_date');
        }
        if($request->end_date){
            $asr->end_date = $request->input('end_date');
        }
        if($request->technical_requirement){
            $asr->technical_requirement = $request->input('technical_requirement');
        }
            
        if($request->question){
            foreach($request->question as $que){
                if($que['is_add'] == false){
                $quest = Question::whereHas('assignmentVideoResume', function($query){
                                        $query->where('assignment_video_resume_id','=', $this->assignment_video_resume_id);
                })->get();
                foreach($quest as $q){
                        $quest_id = $q->id;
                    
                        $quest_e = $asr->assignmentVideoResume()->find($quest_id);
                        if($que['question']!=null){
                            $quest_e->question = $que['question'];
                        }
                }
            }else{
                foreach($request->question as $que){
                        $asr->assignmentVideoResume()->create([
                            'question' => $que['question'],
                            'assignment_video_resume_id' => $asr->id,
                        ]);
                        
                    }
                }   
            }
        }   

            $asr->save();
        

        return response()->json([
            'success' => true,
            'data' => $asr
        ]);  
    }

    public function destroy($id)
    {
        $asr = AssignmentVideoResume::find($id);
        $asr->delete();

        return response()->json([
            'message' => 'Assignment Video Resume deleted',
            'data' => $asr,
        ]);
    }
}

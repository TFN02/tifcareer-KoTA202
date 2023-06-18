<?php

namespace App\Http\Controllers\Api;

use App\Models\VideoResume;
use App\Models\Question;
use App\Models\Application;
use App\Models\AssignmentVideoResume;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Question_VideoResume;

class VideoResumeController extends Controller
{

    private int $application_id;

    public function index(Request $request)
    {
        $vr = VideoResume::with('application','question','segmentVideoResume');

        if($request->application_id){
            $this->application_id = $request->assignment_video_resume_id;
            $vr = $vr->whereHas('application', function($query){
                            $query->where('application_id', $this->application_id);
            });
        }

        if($request->order_by && $request->order_type){
            $vr = $vr->orderBy($request->order_by, $request->order_type);
        }else{
            $vr = $vr->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $vr->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'application_id' => 'required|int',
            'description' => 'required|string',
            'link_video' => 'required|string',
            'duration' => 'required|date_format:H:i:s',
        ]);

        if($request->application_id){
            $application = Application::find($request->application_id);
            $application_id = $application->id;
        }

        $vr = VideoResume::create([
            'application_id' => $application_id,
            'description' => $request->description,
            'link_video' => $request->link_video,
            'duration' => $request->duration,
        ]);

        if($request->segment_video_resume){
            $s_vids = $request->segment_video_resume;
            foreach($s_vids as $s){
                $vr->segmentVideoResume()->create([
                    'time_to_jump' => $s['time_to_jump'],
                    'segment_title' => $s['segment_title'],
                    'video_resume_id' => $vr->id,
                ]);

            }
        }
        return response()->json([
            'success' => true,
            'data' =>  $vr,
        ]);

    }

    public function show($id)
    {
        $vr = VideoResume::with('application','question')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $vr
        ]);
    }

    public function update(Request $request, $id)
    {
        $vr = VideoResume::findOrFail($id); 
            

        if($request->application_id){ 
            $application = Application::find($request->application_id);
            $vr->application_id = $application->id;
        }

        if($request->description){
            $vr->description = $request->input('description');
        }
        if($request->link_video){
            $vr->link_video = $request->input('link_video');
        }
        if($request->duration){
            $vr->duration = $request->input('duration');
        }

        $vr->save();

        return response()->json([
            'success' => true,
            'data' => $vr
        ]);  
    }

    public function destroy($id)
    {
        $vr = VideoResume::find($id);
        $vr->delete();

        return response()->json([
            'message' => 'Video Resume  deleted',
            'data' => $vr,
        ]);
    }

    public function scoringVideoResume(Request $request, $id)
    {
        $vr = VideoResume::findOrFail($id); 
           
        $scores = $request->score;

        $total_score = 0;
        $avg_score = 0;
        if($vr->application_id){ 
            $application = Application::find($vr->application_id);
            $application->video_resume_id = $vr->application_id;
            $assignment_video_resume = AssignmentVideoResume::find($application->assignment_video_resume_id);
            if($assignment_video_resume->id){
                $questions = Question::where('assignment_video_resume_id',$assignment_video_resume->id)->get();
                if($questions!=null && count($questions)==count($scores)){
                    $i=0;
                    foreach($questions as $quest){
                        
                            $quest = Question_VideoResume::create([
                                'video_resume_id' => $vr->id,
                                'question_id' => $quest->id,
                                'score' => $scores[$i]['question'],
                            ]);
                        
                            $total_score = $total_score + $scores[$i]['question'];
                            $i+=1;
                    }
                    $avg_score = $total_score / count($questions);
                }
            }
        }
        
        $vr->total_score = $total_score;
        $vr->avg_score = $avg_score;
        $vr->save();

        return response()->json([
            'success' => true,
            'data' => $vr
        ]);  
    }


}

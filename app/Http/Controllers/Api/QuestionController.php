<?php

namespace App\Http\Controllers\Api;

use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AssignmentVideoResume;


class QuestionController extends Controller
{
    private int $video_resume_id;
    private int $assignment_video_resume_id;

    public function index(Request $request)
    {
        $question = Question::with('assignmentVideoResume', 'videoResume');

        if($request->assignment_video_resume_id){
            $this->assignment_video_resume_id = $request->assignment_video_resume_id;
            $question = $question->whereHas('assignmentVideoResume', function($query){
                            $query->where('assignment_video_resume_id', $this->assignment_video_resume_id);
            });
        }

        if($request->video_resume_id){
            $this->video_resume_id = $request->video_resume_id;
            $question = $question->whereHas('videoResume', function($query){
                            $query->where('video_resume_id', $this->video_resume_id);
            });
        }

        if($request->order_by && $request->order_type){
            $question = $question->orderBy($request->order_by, $request->order_type);
        }else{
            $question = $question->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $question->paginate(20),
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'assignment_video_resume_id' => 'required|int',
            'question' => 'required|string',
        ]);

        if($request->assignment_video_resume_id){
            $assignment_video_resume = AssignmentVideoResume::find($request->assignment_video_resume_id);
            $asr_id = $assignment_video_resume->id;
        }

        $question = Question::create([
            'assignment_video_resume_id' => $asr_id,
            'question' => $request->question,
        ]);


        return response()->json([
            'success' => true,
            'data' =>  $question,
        ]);
    }

    public function show($id)
    {
        $question = Question::with('assignmentVideoResume', 'videoResume')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $question
        ]);
    }

    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id); 
            
        if($request->assignment_video_resume_id){ 
            $asr = AssignmentVideoResume::find($request->assignment_video_resume_id);
            $question->assignment_video_resume_id = $asr->id;
        }

        if($request->question){
            $question->question = $request->input('question');
        }
        
        $question->save();

        return response()->json([
            'success' => true,
            'data' => $question
        ]);  
    }

    public function destroy($id)
    {
        $question = Question::find($id);
        $question->delete();

        return response()->json([
            'message' => 'Question  deleted',
            'data' => $question,
        ]);
    }
}

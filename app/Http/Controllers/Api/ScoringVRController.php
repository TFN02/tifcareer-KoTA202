<?php

namespace App\Http\Controllers\Api;

use App\Models\VideoResume;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ScoringVRController extends Controller
{


    public function updateScore(Request $request)
    {
        $request->validate([
            'video_resume_id' => 'required|int',
            'question_id' => 'required|int',
            'score' => 'required|numeric',
        ]);

        $vr = VideoResume::with('question');
        if($request->video_resume_id){ 
        
            $vr = $vr->find($request->video_resume_id);
            if($vr->id && $request->question_id){
                $qs = Question::find($request->question_id);
                $quest = $vr->question()->find($request->question_id); 
                if(!$quest){
                    $vr->question()->attach($qs->id);
                    $quest = $vr->question()->find($request->question_id);
                    if($request->score){
                        $piv = $quest->pivot;
                        $piv->score = $request->score;
                        $piv->update();      
                    }
                }else{
                    if($request->score){
                        $piv = $quest->pivot;
                        $piv->score = $request->score;
                        $piv->update();      
                    }
                }
            }
            $video = VideoResume::with('question')->find($request->video_resume_id);
            $video = $video->question()->get();
            $total_nilai = 0;
            foreach($video as $vid){
                $total_nilai = $total_nilai + $vid->pivot->score;
            }
            $avg = $total_nilai/count($video);
            $vr->total_score = $total_nilai;
            $vr->avg_score = $avg;
            $vr->save();
        }
        

        return response()->json([
            'success' => true,
            'data' => $vr
        ]);  
    }

}

<?php

namespace App\Http\Controllers\Api;

use App\Models\SegmentVideoResume;
use App\Models\VideoResume;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SegmentVideoResumeController extends Controller
{
    private int $video_resume_id;
    public function index(Request $request)
    {
        $s_vid = SegmentVideoResume::with('videoResume');

        if($request->video_resume_id){
            $this->video_resume_id = $request->video_resume_id;
            $s_vid = $s_vid->whereHas('videoResume', function($query){
                            $query->where('video_resume_id', $this->video_resume_id);
            });
        }

        if($request->order_by && $request->order_type){
            $s_vid = $s_vid->orderBy($request->order_by, $request->order_type);
        }else{
            $s_vid = $s_vid->orderBy('created_at', 'desc');
        }

        return response()->json([
            'success' => true,
            'data' => $s_vid->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'video_resume_id' => 'required|int',
            'time_to_jump' => 'required|date_format:H:i:s',
            'segment_title' => 'required|string',
        ]);

        if($request->video_resume_id){
            $video_resume = VideoResume::find($request->video_resume_id);
            $vr_id = $video_resume->id;
        }

        $s_vid = SegmentVideoResume::create([
            'video_resume_id' => $vr_id,
            'time_to_jump' => $request->time_to_jump,
            'segment_title' => $request->segment_title,
        ]);

        return response()->json([
            'success' => true,
            'data' =>  $s_vid,
        ]);
    }

    public function show($id)
    {
        $s_vid = SegmentVideoResume::with('videoResume')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $s_vid
        ]);
    }

    public function update(Request $request, $id)
    {
        $s_vid = SegmentVideoResume::findOrFail($id); 
            
        if($request->video_resume_id){ 
            $vr = VideoResume::find($request->video_resume_id);
            $s_vid->video_resume_id = $vr->id;
        }

        if($request->time_to_jump){
            $s_vid->time_to_jump = $request->input('time_to_jump');
        }

        if($request->segment_title){
            $s_vid->segment_title = $request->input('segment_title');
        }
        
        $s_vid->save();

        return response()->json([
            'success' => true,
            'data' => $s_vid
        ]); 
    }

    public function destroy($id)
    {
        $s_vid = SegmentVideoResume::find($id);
        $s_vid->delete();

        return response()->json([
            'message' => 'Segment Video deleted',
            'data' => $s_vid,
        ]);
    }
}

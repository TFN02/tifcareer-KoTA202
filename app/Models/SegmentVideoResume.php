<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SegmentVideoResume extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    public function videoResume(){
        return $this->belongsTo(VideoResume::class,'video_resume_id');
    }
}

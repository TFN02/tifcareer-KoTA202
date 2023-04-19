<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoResume extends Model
{
    use HasFactory;

    public function application(){
        return $this->belongsTo(Application::class);
    }

    public function question(){
        return $this->belongsTo(Question::class, 'question_video_resume');
    }

    public function segmentVideoResume(){
        return $this->hasMany(SegmentVideoResume::class);
    }
}

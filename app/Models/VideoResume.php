<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoResume extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function application(){
        return $this->belongsTo(Application::class);
    }

    public function question(){
        return $this->belongsToMany(Question::class, 'question_video_resume')->withPivot('score');
    }

    public function segmentVideoResume(){
        return $this->hasMany(SegmentVideoResume::class, 'video_resume_id');
    }
}

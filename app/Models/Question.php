<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function assignmentVideoResume(){
        return $this->belongsTo(AssignmentVideoResume::class, 'assignment_video_resume_id');
    }

    public function videoResume(){
        return $this->belongsToMany(VideoResume::class, 'question_video_resume')->withPivot('score');
    }
}

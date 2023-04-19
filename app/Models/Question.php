<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public function assignmentVideoResume(){
        return $this->belongsTo(AssignmentVideoResume::class);
    }

    public function videoResume(){
        return $this->belongsToMany(VideoResume::class, 'question_video_resume');
    }
}

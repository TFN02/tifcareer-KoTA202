<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question_VideoResume extends Model
{
    protected $table = 'question_video_resume';
    protected $fillable = ['video_resume_id', 'question_id', 'score'];
    use HasFactory;
    
}

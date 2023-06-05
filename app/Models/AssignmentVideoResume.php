<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentVideoResume extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function job(){
        return $this->belongsTo(Job::class, 'job_id');
    }

    public function question(){
        return $this->hasMany(Question::class, 'assignment_video_resume_id');
    }

    public function assignementVideoResume(){
        return $this->belongsTo(AssignmentVideoResume::class, 'assignment_video_resume_id');
    }

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
    
    public function application(){
        return $this->hasMany(Question::class, 'assignment_video_resume_id');
    }
}

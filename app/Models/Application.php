<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function applicant(){
        return $this->belongsTo(Applicant::class, 'applicant_id');
    }

    public function job(){
        return $this->belongsTo(Job::class, 'job_id');
    }

    public function videoResume(){
        return $this->hasOne(VideoResume::class);
    }
}

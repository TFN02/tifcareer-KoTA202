<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function assignmentVideoResume(){
        return $this->hasOne(AssignmentVideoResume::class,'job_id');
    }

    public function notification(){
        return $this->hasOne(notification::class,'job_id');
    }

    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }

    public function jobCategory(){
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }

    public function weightingCriteria(){
        return $this->hasMany(WeightingCriteria::class, 'job_id');
    }

    public function weightingVariable(){
        return $this->hasMany(WeightingVariable::class, 'job_id');
    }

    public function application(){
        return $this->hasMany(Application::class, 'job_id');
    }
}

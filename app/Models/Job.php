<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function assignmentVideoResume(){
        return $this->hasOne(AssignmentVideoResume::class);
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function jobCategory(){
        return $this->belongsTo(JobCategory::class);
    }

    public function weightingCriteria(){
        return $this->hasMany(WeightingCriteria::class);
    }

    public function weightingVariable(){
        return $this->hasMany(WeightingVariable::class);
    }
}

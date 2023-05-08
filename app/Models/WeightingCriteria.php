<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeightingCriteria extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    public function job(){
        return $this->belongsTo(Job::class, 'job_id');
    }

    public function weightingVariable(){
        return $this->HasMany(WeightingVariable::class, 'weighting_criteria_id');
    }
}

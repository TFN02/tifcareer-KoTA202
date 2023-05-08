<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeightingVariable extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    public function job(){
        return $this->belongsTo(Job::class, 'job_id');
    }

    public function weightingCriteria(){
        return $this->belongsTo(WeightingCriteria::class, 'weighting_criteria_id');
    }
}

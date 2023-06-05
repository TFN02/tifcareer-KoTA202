<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function applicant(){
        return $this->belongsToMany(Applicant::class, 'applicant_notification');
    }

    public function company(){
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function job(){
        return $this->belongsTo(Job::class,'job_id');
    }
}

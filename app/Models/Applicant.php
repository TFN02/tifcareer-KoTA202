<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user(){
        return $this->hasOne(User::class);
    }

    public function education(){
        return $this->belongsToMany(Education::class, 'applicant_education', 'applicant_id', 'education_id');
    }

    public function workExperience(){
        return $this->hasMany(WorkExperience::class, 'applicant_id');
    }

    public function skill(){
        return $this->belongsToMany(Skill::class, 'applicant_skill', 'applicant_id', 'skill_id');
    }

    public function interestArea(){
        return $this->belongsToMany(InterestArea::class, 'applicant_interest_area', 'applicant_id', 'interest_area_id');
    }

    public function notification(){
        return $this->belongsToMany(Notification::class, 'applicant_notification', 'applicant_id', 'notification_id');
    }

    public function application(){
        return $this->hasMany(Application::class, 'applicant_id');
    }

    public function softSkill(){
        return $this->hasMany(SoftSkill::class, 'applicant_id');
    }

    public function certificate(){
        return $this->hasMany(Certificate::class, 'applicant_id');
    }
}

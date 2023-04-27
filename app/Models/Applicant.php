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
        return $this->belongsToMany(Education::class, 'applicant_education');
    }

    public function workExperience(){
        return $this->hasMany(WorkExperience::class);
    }

    public function skill(){
        return $this->belongsToMany(Skill::class, 'applicant_skill');
    }

    public function interestArea(){
        return $this->belongsToMany(InterestArea::class, 'applicant_interest_area');
    }

    public function notification(){
        return $this->belongsToMany(Notification::class, 'applicant_notification');
    }

    public function application(){
        return $this->hasMany(Application::class);
    }

    public function softSkill(){
        return $this->hasMany(SoftSkill::class);
    }

    public function certificate(){
        return $this->hasMany(Certificate::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Job;

class Company extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user(){
        return $this->hasOne(User::class, 'company_id');
    }

    public function job(){
        return $this->hasMany(Job::class,'company_id');
    }

    public function notification(){
        return $this->hasMany(Notification::class, 'company_id');
    }
    
}

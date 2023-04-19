<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentVideoResume extends Model
{
    use HasFactory;

    public function job(){
        return $this->belongsTo(Job::class);
    }

    public function question(){
        return $this->hasMany(Question::class);
    }
    
}

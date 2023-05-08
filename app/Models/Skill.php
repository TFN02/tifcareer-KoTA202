<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function applicant(){
        return $this->belongsToMany(Applicant::class, 'applicant_skill');
    }

    public function skillCategory(){
        return $this->belongsTo(skillCategory::class);
    }
}

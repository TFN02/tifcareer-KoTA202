<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkExperience extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function applicant(){
        return $this->belongsTo(applicant::class, 'applicant_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterestArea extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    public function applicant(){
        return $this->belongsToMany(Applicant::class, 'applicant_interest_area');
    }
}

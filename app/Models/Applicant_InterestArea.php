<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant_InterestArea extends Model
{
    protected $table = 'applicant_interest_area';
    protected $fillable = ['applicant_id', 'interest_area_id', 'reason_of_interest'];
    use HasFactory;
}

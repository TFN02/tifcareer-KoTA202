<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;

    protected $guarded = ['job_id'];

    public function companies(){
        return $this->belongsTo(Companies::class);
    }
}

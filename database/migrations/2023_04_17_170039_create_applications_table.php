<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id');
            $table->foreignId('applicant_id');
            $table->foreignId('video_resume_id');
            $table->float('score');
            $table->integer('rank');
            $table->string('status',100);
            $table->json('education');
            $table->json('work_experience');
            $table->json('skill');
            $table->json('interest_area');
            $table->timestamp('send_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applications');
    }
};

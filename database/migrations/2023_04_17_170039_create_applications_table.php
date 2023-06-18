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
            $table->bigInteger('job_id')->unsigned()->nullable();
            $table->bigInteger('applicant_id')->unsigned()->nullable();
            $table->bigInteger('video_resume_id')->unsigned()->nullable();
            $table->bigInteger('assignment_video_resume_id')->unsigned()->nullable();
            $table->float('score')->nullable();
            $table->integer('rank')->nullable();
            $table->json('education')->nullable();
            $table->json('work_experience')->nullable();
            $table->json('skill')->nullable();
            $table->json('interest_area')->nullable();
            $table->json('soft_skill')->nullable();
            $table->json('certificate')->nullable();
            $table->boolean('is_selection_1')->nullable();
            $table->boolean('is_pass_selection_1')->nullable();
            $table->boolean('is_selection_2')->nullable();
            $table->boolean('is_pass_selection_2')->nullable();
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

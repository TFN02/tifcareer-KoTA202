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
        Schema::table('certificates', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('soft_skills', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('role_user', function (Blueprint $table) {
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('super_admin_id')->references('id')->on('super_admins')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('companies', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('jobs', function (Blueprint $table) {
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('assignment_video_resume_id')->references('id')->on('assignment_video_resumes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('job_category_id')->references('id')->on('job_categories')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('notification_id')->references('id')->on('notifications')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('super_admins', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('applicants', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('applicant_education', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('education_id')->references('id')->on('educations')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('work_experiences', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('applicant_interest_area', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('interest_area_id')->references('id')->on('interest_areas')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('skills', function (Blueprint $table) {
            $table->foreign('skill_category_id')->references('id')->on('skill_categories')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('applicant_skill', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('skill_id')->references('id')->on('skills')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('applications', function (Blueprint $table) {
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('video_resume_id')->references('id')->on('video_resumes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('assignment_video_resume_id')->references('id')->on('assignment_video_resumes')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('video_resumes', function (Blueprint $table) {
            $table->foreign('application_id')->references('id')->on('applications')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->foreign('assignment_video_resume_id')->references('id')->on('assignment_video_resumes')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('question_video_resume', function (Blueprint $table) {
            $table->foreign('video_resume_id')->references('id')->on('video_resumes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('assignment_video_resumes', function (Blueprint $table) {
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('applicant_notification', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->on('applicants')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('notification_id')->references('id')->on('notifications')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('weighting_variables', function (Blueprint $table) {
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('weighting_criteria_id')->references('id')->on('weighting_criterias')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('weighting_criterias', function (Blueprint $table) {
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('segment_video_resumes', function (Blueprint $table) {
            $table->foreign('video_resume_id')->references('id')->on('video_resumes')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('question_video_resume', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });

        Schema::table('applicant_interest_area', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
    }
};

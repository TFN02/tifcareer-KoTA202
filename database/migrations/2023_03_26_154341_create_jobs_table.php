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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('company_id')->unsigned()->nullable();
            $table->bigInteger('assignment_video_resume_id')->unsigned()->nullable();
            $table->bigInteger('job_category_id')->unsigned()->nullable();
            $table->bigInteger('notification_id')->unsigned()->nullable();
            $table->string('title',100)->nullable();
            $table->string('job_position',50)->nullable();
            $table->longText('job_desc')->nullable();
            $table->string('location',150)->nullable();
            $table->string('salary',20)->nullable();
            $table->boolean('is_active')->nullable();
            $table->boolean('is_selection_1')->nullable();
            $table->boolean('is_selection_2')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
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
        Schema::dropIfExists('jobs');
    }
};

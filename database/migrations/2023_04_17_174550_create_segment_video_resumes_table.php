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
        Schema::create('segment_video_resumes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('video_resume_id')->unsigned()->nullable();
            $table->time('time_to_jump')->nullable();
            $table->string('segment_title',20)->nullable();
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
        Schema::dropIfExists('segment_video_resumes');
    }
};

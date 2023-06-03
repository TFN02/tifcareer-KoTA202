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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('application_id')->unsigned()->nullable();
            $table->string('title')->nullable();
            $table->string('tags')->nullable();
            $table->string('description',255)->nullable();
            $table->string('video_path')->nullable();
            $table->json('segment_video')->nullable();
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
        Schema::dropIfExists('video_resumes');
    }
};

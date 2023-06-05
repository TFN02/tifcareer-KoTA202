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
        Schema::create('video_resumes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('application_id')->unsigned()->nullable();
            $table->string('youtube_video_id')->nullable();
            $table->string('category_id')->nullable();
            $table->string('title',255)->nullable();
            $table->text('description')->nullable();
            $table->string('tags',255)->nullable();
            $table->integer('total_score')->nullable();
            $table->float('avg_score')->nullable();
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

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
            $table->string('youtube_video_id',20)->nullable();
            $table->string('category_id',20)->nullable();
            $table->string('title',50)->nullable();
            $table->text('description')->nullable();
            $table->string('tags',30)->nullable();
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

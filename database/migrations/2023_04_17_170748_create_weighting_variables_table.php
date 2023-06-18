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
        Schema::create('weighting_variables', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('job_id')->unsigned()->nullable();
            $table->bigInteger('weighting_criteria_id')->unsigned()->nullable();
            $table->json('name')->nullable();
            $table->float('weight')->nullable();
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
        Schema::dropIfExists('weighting_variables');
    }
};

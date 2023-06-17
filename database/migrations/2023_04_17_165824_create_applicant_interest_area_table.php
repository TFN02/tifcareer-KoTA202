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
        Schema::create('applicant_interest_area', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('applicant_id')->unsigned();
            $table->bigInteger('interest_area_id')->unsigned();
            $table->longText('reason_of_interest')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applicant_interest_areas');
    }
};

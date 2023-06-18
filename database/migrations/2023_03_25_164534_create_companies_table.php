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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('name',50)->nullable();
            $table->string('pic',50)->nullable();
            $table->longText('description')->nullable();
            $table->integer('year_founded')->nullable();
            $table->string('phone_no',30)->nullable();
            $table->text('address')->nullable();
            $table->string('npwp',15)->nullable();
            $table->string('no_kk',20)->nullable();
            $table->string('no_ktp',20)->nullable();
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
        Schema::dropIfExists('companies');
    }
};

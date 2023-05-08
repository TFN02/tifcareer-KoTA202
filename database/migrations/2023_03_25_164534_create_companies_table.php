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
            $table->string('name',100)->nullable();
            $table->longText('description')->nullable();
            $table->integer('year_founded')->nullable();
            $table->string('phone_no',100)->nullable();
            $table->text('address')->nullable();
            $table->string('npwp',15)->nullable()->unique();
            $table->string('siup',100)->nullable()->unique();
            $table->string('nrp',100)->nullable()->unique();
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

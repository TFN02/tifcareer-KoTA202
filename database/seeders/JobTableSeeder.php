<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Seeder;


class JobTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Job::factory(20)->count(1000)->create();
    }
}

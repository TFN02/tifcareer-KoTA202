<?php

namespace Database\Seeders;

use App\Models\JobCategory;
use Illuminate\Database\Seeder;


class JobCategoryTableSeeder extends Seeder
{
    public function run()
    {
        JobCategory::factory(7)->count(7)->create();
    }
}

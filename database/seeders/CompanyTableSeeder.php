<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;


class CompanyTableSeeder extends Seeder
{
    public function run()
    {
        Company::factory(3)->count(3)->create();
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_admin_user = new Role;
        $role_admin_user->name = 'admin';
        $role_admin_user->save();
    
        $role_regular_user = new Role;
        $role_regular_user->name = 'pelamar';
        $role_regular_user->save();

        $role_regular_user = new Role;
        $role_regular_user->name = 'perusahaan';
        $role_regular_user->save();
    }
}

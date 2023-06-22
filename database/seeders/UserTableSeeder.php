<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User;
        $admin->name = 'Admin';
        // $admin->username = 'admin';
        $admin->email = 'admin@email.com';
        $admin->password = Hash::make('admin123');
        $admin->save();
        $admin->roles()->attach(Role::where('name','admin')->first());

        $pelamar = new User;
        $pelamar->name = 'Pelamar';
        // $pelamar->username = 'pelamar';
        $pelamar->email = 'pelamar@email.com';
        $pelamar->password = Hash::make('password');
        $pelamar->save();
        $pelamar->roles()->attach(Role::where('name','pelamar')->first());

        $perusahaan = new User;
        $perusahaan->name = 'Perusahaan';
        // $perusahaan->username = 'perusahaan';
        $perusahaan->email = 'perusahaan@email.com';
        $perusahaan->password = Hash::make('password');
        $perusahaan->save();
        $perusahaan->roles()->attach(Role::where('name','perusahaan')->first());
    }
}

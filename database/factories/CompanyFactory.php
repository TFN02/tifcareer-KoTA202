<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    
    public function definition()
    {
        return [
            'name' => fake()->randomElement([
                "PT. Jaya Abadi",
                "PT. Satu Dua",
                "PT. Bebek Angsa",
            ]),
            'user_id' => fake()->randomElement([
                1,
                2,
                3, 
            ]),
            'description' => fake()->randomElement([
                "Perusahaan IT Multinasional",
                "Perusahaan IT Consultant",
                "Membangun Web Bersama Perusahaan Kami",
            ]),
            'year_founded' => fake()->randomElement([
                2015,
                2016,
                2017,
            ]),
            'phone_no' => fake()->randomElement([
                "08123456789",
                "08128763708",
                "08122456397",
            ]),
            'address' => fake()->randomElement([
                "Jl. Wayang no.19, Kel.Karang Asem, Kec.Cigintung, Kota Kalimun",
                "Jl. Bumi Sari no.40, Kel.Lebak Hulu, Kec.Mekar Wangi, Kota Sadana",
                "Jl. Warga Maju no.95, Kel.Bojong, Kec.Cilauk, Kota Lumajang",
            ]),
        ];
    }
}
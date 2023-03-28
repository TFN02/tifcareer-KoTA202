<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jobs>
 */
class JobsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'posisiPekerjaan' => fake()->jobTitle(),
            'jenisPekerjaan' => fake()->randomElement([
                "Front End Developer",
                "Back End Developer",
                "Full Stack Developer",
                "Mobile Developer",
            ]),
            'lokasi' => fake()->randomElement([
                "Jakarta",
                "Bandung",
                "Karawang",
                "Bekasi",
                "Bogor",
            ]),
            'gajih' => fake()->randomElement([
                "5.000.000",
                "10.000.000",
                "15.000.000",
                "20.000.000",
            ]),
        ];
    }
}
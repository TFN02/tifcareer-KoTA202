<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->jobTitle(),
            'company_id' => fake()->randomElement([
                1,
                2,
                3,
            ]),
            'job_category_id' => fake()->randomElement([
                1,
                2,
                3,
                4,
                5,
                6,
                7,
            ]),
            'job_position' => fake()->randomElement([
                "Software Developer",
                "Mobile Developer",
                "Web Developer",
                "Game Developer",
            ]),
            'location' => fake()->randomElement([
                "Jakarta",
                "Bandung",
                "Karawang",
                "Bekasi",
                "Bogor",
            ]),
            'salary' => fake()->randomElement([
                "5.000.000",
                "10.000.000",
                "15.000.000",
                "20.000.000",
            ]),
        ];
    }
}
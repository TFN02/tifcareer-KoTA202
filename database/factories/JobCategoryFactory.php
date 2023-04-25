<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobCategoryFactory extends Factory
{
    
    public function definition()
    {
        return [
            'name' => fake()->randomElement([
                "Systems Analysts",
                "Software Developers",
                "Web and Multimedia Developers",
                "Database Designers and Administrators",
                "Applications Programmers",
                "Systems Administrators",
                "Computer Network Professionals",
            ]),
        ];
    }
}
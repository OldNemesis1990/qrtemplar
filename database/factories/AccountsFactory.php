<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

class AccountsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $account_type = ['company', 'individual'];
        $industryselection = ['Marketing', 'Industrial', 'Real Estate', 'Education', 'Motor'];
        $purpose = ['marketing','social_media','product_tracking','information','sales','network','payments'];
        return [
            'user_id' => -1,
            'account_type' => $account_type[rand(0,1)],
            'company_name' => $this->faker->company(),
            'industry' => $industryselection[rand(0,4)],
            'purpose' => $purpose[rand(0,6)],
            'other_purpose' => NULL,
            'package_id' => rand(1,4)
        ];
    }
}

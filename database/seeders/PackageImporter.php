<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use Log;

class PackageImporter extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $packages = [
            [
                "package_name" => "Lite Package",
                "campaign_limit" => "1",
                "qr_limit" => "1"
            ],
            [
                "package_name" => "Lite+ Package",
                "campaign_limit" => "1",
                "qr_limit" => "25"
            ],
            [
                "package_name" => "Lite Campaign Package",
                "campaign_limit" => "10",
                "qr_limit" => "100"
            ],
            [
                "package_name" => "Campaign Package",
                "campaign_limit" => "25",
                "qr_limit" => "250" 
            ]
        ];

        Log::debug(print_r($packages, true));
        try {
            $test_id = 0;
            foreach ($packages as $package) {
                DB::table('packages')->insert([
                    "woo_post_id" => $test_id, 
                    "package_name" => $package['package_name'],
                    "campaign_limit" => $package['campaign_limit'],
                    "qr_limit" => $package['qr_limit']
                ]);
                $test_id++;
            }
        } catch (Exception $e) {
            Log::error($e->getMessage($e));
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Models\User;
use App\Models\Accounts;

use Auth;
use DB;
use Hash;
use Log;

class UserImporter extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        try {

            $user = User::where('email', 'lee.baartman@outlook.com')->first();

            if($user == null) {

                $user = User::create([
                    'name' => 'Lee Baartman',
                    'email' => 'lee.baartman@outlook.com',
                    'email_verified_at' => date('Y-m-d H:i:s'),
                    'password' => Hash::make('templeQR9551'),
                    'verified' => 1
                ]);
            }
            else {
                $this->command->warn('User already exists! No need to recreate');
            }

            $super_administrator = Role::firstOrCreate(['name' => 'Super Administrator']);

            $administrator = Role::firstOrCreate(['name' => 'Administrator']); // SuperAdmin

            $account_user = Role::firstOrCreate(['name' => 'Account User']);
            $campaign_account_user = Role::firstOrCreate(['name' => 'Campaign Account User']);
            $lite_user = Role::firstOrCreate(['name' => 'Lite User']);
            $lite_plus_user = Role::firstOrCreate(['name' => 'Lite Plus User']);
            $light_campaign_user = Role::firstOrCreate(['name' => 'Light Campaign User']);
            $campaign_user = Role::firstOrCreate(['name' => 'Campaign User']);

            $manageAllUsers = Permission::firstOrCreate(['name' => 'manage all users']);
            $manageUsers = Permission::firstOrCreate(['name' => 'manage users']);
            $manageProfile = Permission::firstOrCreate(['name' => 'manage profile']);
            $manageProducts = Permission::firstOrCreate(['name' => 'manage products']);
            $manageCategories = Permission::firstOrCreate(['name' => 'manage categories']);
            $liteProducts = Permission::firstOrCreate(['name' => 'lite products']);
            $litePlusProducts = Permission::firstOrCreate(['name' => 'lite plus products']);
            $premiumProducts = Permission::firstOrCreate(['name' => 'premium products']);
            $manageAccountUsers = Permission::firstOrCreate(['name' => 'manage account users']);
            $viewStats = Permission::firstOrCreate(['name' => 'view stats']);
            $manageCodes = Permission::firstOrCreate(['name' => 'manage codes']);
            $viewDash = Permission::firstOrCreate(['name' => 'view dashboard']);
            $manage_campaigns = Permission::firstOrCreate(['name' => 'manage campaigns']);

            $super_administrator->givePermissionTo($manageAllUsers);
            $super_administrator->givePermissionTo($manageUsers);
            $super_administrator->givePermissionTo($manageProfile);
            $super_administrator->givePermissionTo($manageProducts);
            $super_administrator->givePermissionTo($manageCategories);
            $super_administrator->givePermissionTo($liteProducts);
            $super_administrator->givePermissionTo($litePlusProducts);
            $super_administrator->givePermissionTo($premiumProducts);
            $super_administrator->givePermissionTo($viewStats);
            $super_administrator->givePermissionTo($manageCodes);
            $super_administrator->givePermissionTo($manageAccountUsers);
            $super_administrator->givePermissionTo($viewDash);
            $super_administrator->givePermissionTo($manage_campaigns);

            $administrator->givePermissionTo($manageUsers);
            $administrator->givePermissionTo($manageCategories);
            $administrator->givePermissionTo($manageProducts);
            $administrator->givePermissionTo($manageProfile);
            $administrator->givePermissionTo($liteProducts);
            $administrator->givePermissionTo($litePlusProducts);
            $administrator->givePermissionTo($premiumProducts);
            $administrator->givePermissionTo($viewStats);
            $administrator->givePermissionTo($manageCodes);
            $administrator->givePermissionTo($viewDash);
            $administrator->givePermissionTo($manage_campaigns);

            $campaign_user->givePermissionTo($liteProducts);
            $campaign_user->givePermissionTo($litePlusProducts);
            $campaign_user->givePermissionTo($premiumProducts);
            $campaign_user->givePermissionTo($manageProfile);
            $campaign_user->givePermissionTo($manageAccountUsers);
            $campaign_user->givePermissionTo($viewStats);
            $campaign_user->givePermissionTo($manageCodes);
            $campaign_user->givePermissionTo($viewDash);
            $campaign_user->givePermissionTo($manage_campaigns);

            $light_campaign_user->givePermissionTo($liteProducts);
            $light_campaign_user->givePermissionTo($litePlusProducts);
            $light_campaign_user->givePermissionTo($premiumProducts);
            $light_campaign_user->givePermissionTo($manageProfile);
            $light_campaign_user->givePermissionTo($manageAccountUsers);
            $light_campaign_user->givePermissionTo($viewStats);
            $light_campaign_user->givePermissionTo($manageCodes);
            $light_campaign_user->givePermissionTo($viewDash);
            $light_campaign_user->givePermissionTo($manage_campaigns);

            $lite_plus_user->givePermissionTo($liteProducts);
            $lite_plus_user->givePermissionTo($litePlusProducts);
            $lite_plus_user->givePermissionTo($manageProfile);
            $lite_plus_user->givePermissionTo($viewStats);
            $lite_plus_user->givePermissionTo($manageCodes);
            $lite_plus_user->givePermissionTo($viewDash);
            $lite_plus_user->givePermissionTo($manage_campaigns);

            $lite_user->givePermissionTo($liteProducts);
            $lite_user->givePermissionTo($manageProfile);
            $lite_user->givePermissionTo($viewStats);
            $lite_user->givePermissionTo($manageCodes);
            $lite_user->givePermissionTo($viewDash);
            $lite_user->givePermissionTo($manage_campaigns);

            if(!$user->hasRole(['Super Administrator'])) {
                $user->assignRole('Super Administrator');
            }

            $campaignUser = User::where('email', 'thinimab@gmail.com')->first();

            if($campaignUser == null) {

                $campaignUser = User::create([
                    'name' => 'Marthinus Botha',
                    'email' => 'thinimab@gmail.com',
                    'email_verified_at' => date('Y-m-d H:i:s'),
                    'password' => Hash::make('zxasqw12'),
                    'verified' => 1
                ]);

                DB::table('accounts')->insert([
                    'user_id' => $campaignUser->id,
                    'account_type' => "individual",
                    'company_name' => NULL,
                    'industry' => NULL,
                    'purpose' => "information",
                    'other_purpose' => NULL,
                    'package_id' => 4,
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")
                ]);

                $campaignUser->assignRole('Campaign User');

            }
            else {
                $this->command->warn('User already exists! No need to recreate');
            }
            User::factory(50)->create()->each( function (User $user) {
                $roleSelector = [
                    'Lite User',
                    'Lite Plus User',
                    'Light Campaign User',
                    'Campaign User'
                ];
                $account = Accounts::factory(1)->create()->first();
                $account->user_id = $user->id;
                if($account->package_id == 1) {
                    $user->assignRole([$roleSelector[0]]);                    
                } else if($account->package_id == 2) {
                    $user->assignRole([$roleSelector[1]]);                    
                } else if($account->package_id == 3) {
                    $user->assignRole([$roleSelector[2]]);                    
                } else if($account->package_id == 4) {
                    $user->assignRole([$roleSelector[3]]);                    
                }
                $account->save();
            } );
        }
        catch(Exception $exception) {
            $this->command->error("User already created with email address");
        }
    }
}

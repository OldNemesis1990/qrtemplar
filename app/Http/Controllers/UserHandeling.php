<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Package;

use Log;

class UserHandeling extends Controller
{
    public function registrationView() {
        return view('auth.registration');
    }

    public function registerUser(Request $request) {
        $validated = $request->validate([
            'package' => 'required',
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'account_type' => 'required',
            'purpose' => 'required',
            'other_purpose' => 'sometimes|required',
            'company_name' => 'sometimes|required',
            'industry' => 'sometimes|required'
        ]);

        $packageID = intval($validated['package']);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'email_verified_at' => date('Y-m-d H:i:s'),
            'password' => Hash::make($validated['password'])
        ]);

        $createUserAccount = DB::table('accounts')->insert([
            'user_id' => $user->id,
            'account_type' => $validated['account_type'],
            'company_name' => $validated['company_name'] ?? NULL,
            'industry' => $validated['industry'] ?? NULL,
            'purpose' => $validated['purpose'],
            'other_purpose' => $validated['other_purpose'] ?? NULL,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'package_id' => $packageID
        ]);

        if($packageID == 1) {
            $user->assignRole('Lite User');
        } else if($packageID == 2) {
            $user->assignRole('Lite Plus User');
        } else if($packageID == 3) {
            $user->assignRole('Light Campaign User');
        } else if($packageID == 4) {
            $user->assignRole('Campaign User');
        }

        return response()->json([
            "validation" => $validated,
        ]);

    }
}

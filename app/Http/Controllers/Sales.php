<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Packages;

class Sales extends Controller
{
    public function renderPackages() {
        return view('pages.pricing');
    }

    public function getPackageItems() {
        // dd(Packages::all());
        return response()->json([
            "packages" => Packages::all()
        ]);
    }
}

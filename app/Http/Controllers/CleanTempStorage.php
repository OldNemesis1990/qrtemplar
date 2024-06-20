<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Log;
use Carbon\Carbon;

class CleanTempStorage extends Controller
{
    public function deleteTempQrCodes() {
        $files = collect(Storage::allFiles('public/temp_generated_qr_codes'));

        $files->each(function($file) {
            
            $lastModified = Storage::lastModified($file);
            $lastModified = Carbon::parse($lastModified);

            if(Carbon::now()->gt($lastModified->addHours(23))) {
                Storage::delete($file);
            }
        });

        return true;
    }
}

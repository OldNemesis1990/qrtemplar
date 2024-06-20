<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

use Log;

class QrGenerator extends Controller
{
    public function submitContentToGenerator(Request $request) {
        $values = json_decode($request->formValues);
        $selection = $request->selection;
        $background = $request->background;
        $foreground = $request->foreground;
        $qrSize = $request->qrSize;

        $data = [
            'values' => $values,
            'selection' => $selection,
            'background' => $background,
            'foreground' => $foreground,
            'qrSize' => $qrSize,
            'url' => $this->urlGenerator($selection)
        ];

        $dtg = json_encode($data);

        $pythonPath = env("PYTHON_PATH", "bin/python3");
        $pythonCommand = 'Http/Controllers/qr-generator/venv/' . $pythonPath;

        $process = new Process([
            app_path($pythonCommand), app_path('Http/Controllers/qr-generator/generator/qr-generator.py'), $dtg
        ]);

        $process->run();

        if(!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $output = $process->getOutput();

        return response()->json([
            'values' => $dtg,
            'img_url' => $data['url']
        ]);
    }

    private function urlGenerator($selection) {
        $name1 = rand(1000, 9999);
        $name2 = rand(1000, 9999);
        $name3 = rand(1000, 9999);
        $name4 = rand(1000, 9999);

        $name = "{$selection}-{$name1}-{$name2}-{$name3}-{$name4}";

        if(Storage::exists("public/default_images/{$name}.png") || Storage::exists("public/default_images/{$name}.svg")) {
            return $this->urlGenerator();
        }

        return $name;

    }
}

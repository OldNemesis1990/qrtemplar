<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Accounts;
use App\Models\Campaign;
use App\Models\Packages;
use App\Models\StoredQrData;

use Illuminate\Support\Facades\Auth;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

use Log;

class DashboardController extends Controller
{
    public function adminLogin() {
        return view('auth/login');
    }
    
    public function userLogin() {
        return view('auth/login');
    }

    public function adminDashboard() {
        return view('dashboard/admin');
    }

    public function userDashboard() {
        return view('dashboard/user');
    }

    public function userDashboardData() {
        $user_id = Auth::user()->id;
        $account_info = Auth::user()->accounts;
        $manage_campaign = Auth::user()->can('manage campaigns');
        $user_info = Auth::user();
        $userRole = [
            'permissions' => Auth::user()->getPermissionsViaRoles(),
            'roles' => Auth::user()->getRoleNames()
        ];

        return response()->json([
            'user_id' => $user_id,
            'user' => $user_info,
            'role' => $userRole,
            'manage_campaigns' => $manage_campaign,
            'accounts' => $account_info
        ]);
    }

    public function manageCampaigns() {
        $created_by = Auth::user()->id;
        // $updated_by = Auth::user()->id;
        $manage_campaign = Auth::user()->can('manage campaigns');

        if($manage_campaign) {
            // Get Campaigns info
            $campaign = Accounts::with('campaigns', 'packages', 'storedQrData')->where("user_id", $created_by)->get();
            $campaignCount = count($campaign[0]->campaigns);
            $campaign_limit = $campaign[0]->packages->campaign_limit;
            $qr_limit = $campaign[0]->packages->qr_limit;
            $dynamic_qr_codes = $campaign[0]->storedQrData;

            // Log::debug(print_r($campaign, true));
            
            return response()->json([
                "campaign_user" => $manage_campaign,
                "campaign_limit" => $campaign_limit,
                "campaign_count" => $campaignCount,
                "qr_Limit" => $qr_limit,
                "qr_count" => "",
                "account_info" => $campaign,
                "qr_codes" => $dynamic_qr_codes
            ]);
        } else {
            // Get qr code information
            
            return response()->json([
                "campaign_user" => $manage_campaign,
                "QR_Limit" => $qr_limit,
                "qr_count" => "",
                "qr_codes" => $dynamic_qr_codes
            ]);
        }

    }

    public function createItem(Request $request) {
        $manage_campaign = Auth::user()->can('manage campaigns');
        $campaign = Accounts::with('campaigns', 'packages')->where("user_id", Auth::user()->id)->get();
        $campaignCount = count($campaign[0]->campaigns);
        $campaign_limit = $campaign[0]->packages->campaign_limit;
        $qr_limit = $campaign[0]->packages->qr_limit;
        $dynamic_qr_codes = $campaign[0]->storedQrData;

        if($manage_campaign && $campaignCount < $campaign_limit) {
            $campaign_creation = Campaign::create([
                "campaign_name" => $request->campaign_name,
                "client_name" => $request->client_name,
                "client_email" => $request->client_email,
                "account_id" => $request->account_id
            ]);

            $campaign = Accounts::with('campaigns', 'packages')->where("user_id", Auth::user()->id)->get();
            $campaignCount = count($campaign[0]->campaigns);
            $campaign_limit = $campaign[0]->packages->campaign_limit;
            
            return response()->json([
                "message" => "Campaign $campaign_creation->id was created",
                "account_info" => $campaign,
                "campaign_limit" => $campaign_limit,
                "campaign_count" => $campaignCount,
                "qr_limit" => $qr_limit
            ]);
        } else {
            return response()->json([
                "message" => "Sorry your account does not have permission to manage campaigns"
            ]);
        }
    }

    public function updateItem(Request $request) {
        $manage_campaign = Auth::user()->can('manage campaigns');
        $campaign = Accounts::with('campaigns', 'packages')->where("user_id", Auth::user()->id)->get();

        if($manage_campaign) {
            if($request->request_delete) {
                Campaign::find($request->id)->delete();
            } else {
                $update_campaign = Campaign::find($request->id);
                $update_campaign->campaign_name = $request->campaign_name;
                $update_campaign->client_name = $request->client_name;
                $update_campaign->client_email = $request->client_email;
                
                $update_campaign->save();
            }

            $campaign = Accounts::with('campaigns', 'packages')->where("user_id", Auth::user()->id)->get();
            $campaignCount = count($campaign[0]->campaigns);
            $campaign_limit = $campaign[0]->packages->campaign_limit;
            $qr_limit = $campaign[0]->packages->qr_limit;
            $dynamic_qr_codes = $campaign[0]->storedQrData;
            
            return response()->json([
                "account_info" => $campaign,
                "campaign_limit" => $campaign_limit,
                "campaign_count" => $campaignCount,
                "qr_limit" => $qr_limit,
                "qr_codes" => $dynamic_qr_codes
            ]);
        } else {
            return response()->json([
                "message" => "Sorry your account does not have permission to manage campaigns"
            ]);
        }
    }

    public function logUserOut(Request $request) {
        Auth::logout();
        return response()->json(['url' => '/dashboard-login']);
    }

    public function createQRCode( Request $request ) {
        //Receive all the values from the request object
        $values = json_decode($request->form_values);
        $account_id = $request->account_id;
        $campaign_id = $request->campaign_id;
        $bg = $request->bg_color;
        $fg = $request->fg_color;
        $format = $request->format;
        $qr_type = $request->qr_type;
        $size = $request->size;
        $shortURLObject = [];
        $qr_name = str_replace(' ', '-', $request->qr_name);
        if($request->hasFile('logo_upload')) {
            $logo_upload = $request->file('logo_upload');
        } else {
            $logo_upload = false;
        }
        $selection = $request->selection;
        $data = [];
        $store_logo = "";

        //Store the logo to insert onto the QR code
        if(!Storage::exists("public/account_images/$account_id/$campaign_id")) {

            Storage::makeDirectory("public/account_images/$account_id/$campaign_id", 0775, true); //creates directory
        
        }
        if($request->hasFile('logo_upload')) {
            $store_logo = $logo_upload->storeAs("public/account_images/$account_id/$campaign_id", $logo_upload->getClientOriginalName());
            $data['logo_path'] = $store_logo;
            // Log::debug($store_logo);
            // Log::debug($data['logo_path']);

        }
        
        
        //Check the type of QR
        if($qr_type == 'dynamic') {
            $shortURLObject = $this->generateShortURL("https://$values->url");
            $qr_path = "account_images/$account_id/$campaign_id/$qr_name.$format";
            
            $data['url'] = $shortURLObject;
            $data['bg_color'] = $bg;
            $data['fg_color'] = $fg;
            $data['format'] = $format;
            $data['qr_type'] = $qr_type;
            $data['size'] = $size;
            $data['qr_name'] = $qr_name;
            $data['account_id'] = $account_id;
            $data['campaign_id'] = $campaign_id;
            $data['selection'] = $selection;

        } else if($qr_type == 'static') {
            $qr_path = "account_images/$account_id/$campaign_id/$qr_name.$format";

            $data['bg_color'] = $bg;
            $data['fg_color'] = $fg;
            $data['format'] = $format;
            $data['qr_type'] = $qr_type;
            $data['size'] = $size;
            $data['selection'] = $selection;
        } else {
            return response()->json(['message' => 'Qr type is not valid']);    
        }

        //Send the data of user to Python script to process and generate a QR code from it and store it.
        try {
            $this->generateQrCode($data);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }

        //If generation is successfull then store the information in the database
        try {
            $storedQr = StoredQrData::create(
                [
                    'campaign_id' => $campaign_id,
                    'account_id' => $account_id,
                    'type' => $qr_type,
                    'name' => $qr_name,
                    'path' => $qr_path,
                    'short_url' => ($shortURLObject != [] || $shortURLObject != NULL) ? $shortURLObject->id : NULL, 
                    'url_key' => ($shortURLObject != [] || $shortURLObject != NULL) ? $shortURLObject->url_key : NULL,
                    'data' => json_encode(
                        [
                            'background' => $bg,
                            'foreground' => $fg,
                            'format' => $format,
                            'size' => $size,
                            'logo_path' => $store_logo ?? NULL
                        ]
                    ),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'created_at' => date('Y-m-d H:i:s')
                ]
            );

            Log::Debug(print_r($storedQr, true));
            if($qr_type == 'dynamic') {
                $shortURLObject->qr_code_id = $storedQr->id;
                $shortURLObject->save();
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);    
        }

        //To save space, delete the logo image once all is complete
        if($request->hasFile('logo_upload')) {
            Storage::delete($store_logo);
        }

        //Return the response to the user though json to reactjs
        return response()->json(['message' => 'received']);
    }

    public function deleteQrCode(Request $request) {
        $qr_id = $request->qr_id;
        $campaign_id = $request->campaign_id;
        $account_id = $request->account_id;

        $qrPath = StoredQrData::where('id', $qr_id)->first();

        if(Storage::exists("/public/$qrPath->path")) {
            $qrDeleted = Storage::delete("/public/$qrPath->path");
            if($qrDeleted) {
                $qrPath->delete(); 
            }
        } else {
            return response()->json([
                'message' => Storage::exists("/public/$qrPath->path"), 
                'path' => $qrPath->path
            ]);
        }

    }

    protected function generateShortURL($url) {
        $builder = new \AshAllenDesign\ShortURL\Classes\Builder();
        $shortURLObject = $builder->destinationURL("$url")->redirectStatusCode(302)->make();

        return $shortURLObject;
    }

    protected function generateQrCode($data) {
        $data = json_encode($data);

        $process = new Process([
            app_path('Http/Controllers/qr-generator/venv/bin/python3'), app_path('Http/Controllers/qr-generator/generator/advanced-qr-generator.py'), $data
        ]);

        $process->run();

        if(!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        Log::debug($process->getOutput());

        return true;
    }
}

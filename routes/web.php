<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QrGenerator;
use App\Http\Controllers\CleanTempStorage;
use App\Http\Controllers\Sales;
use App\Http\Controllers\UserHandeling;
use App\Http\Controllers\Mailer;

use App\Http\Middleware\ProfileIdRedirect;
use App\Http\Middleware\AdminOnly;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.qr-generator');
});

Auth::routes();

Route::group([ 'middleware' => ['auth'] ], function() {
    //Super Admin Routes
    Route::get( '/overlord-dashboard', [DashboardController::class, 'adminDashboard'] )->middleware(AdminOnly::class);

    //Logged in User Routes
    Route::get( '/dashboard/{user}', [DashboardController::class, 'userDashboard'] )->middleware(ProfileIdRedirect::class);
    Route::get( '/current-user-data', [DashboardController::class, 'userDashboardData'] );
    Route::get( '/user-campaigns', [DashboardController::class, 'manageCampaigns'] );

    Route::post( '/logout-user', [DashboardController::class, 'logUserOut'] );
    Route::post( '/create-campaign',  [DashboardController::class, 'createItem']);
    Route::post( '/update-delete-campaign',  [DashboardController::class, 'updateItem']);

    Route::post( '/create/qr', [DashboardController::class, 'createQRCode'] );
    Route::post( '/delete/qr/{account_id}/{campaign_id}/{qr_id}', [DashboardController::class, 'deleteQrCode'] );

    //Manage QR code
    // Route::get( '/dashboard/{user}/create/{campaign_id}', function() { return view('dashboard.manageqrcode.create'); });
});

// Non session Routes
Route::get( '/overlord-login', [DashboardController::class, 'adminLogin'] );
Route::get( '/dashboard-login', [DashboardController::class, 'userLogin'] );
Route::post( '/generate-qr-code', [QrGenerator::class, 'submitContentToGenerator'] );
Route::get( '/generate-qr-code', [QrGenerator::class, 'submitContentToGenerator'] );
Route::get( '/cleaning-protocol-22568', [CleanTempStorage::class, 'deleteTempQrCodes'] );

Route::get( 'privacy-policy',  function() {
    return view('pages.privacy-policy');
});

Route::get( '/packages', [Sales::class, 'renderPackages'] );
Route::get( '/package-items', [Sales::class, 'getPackageItems'] );

Route::get( '/register/{package}', [UserHandeling::class, 'registrationView'] );
Route::post( '/register-user', [UserHandeling::class, 'registerUser'] );

Route::post( '/mailing-route', [Mailer::class, 'index'] );


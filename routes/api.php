<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\StripeController;
use App\Http\Controllers\Api\PermissionsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix("v1")->group(function (){

    // Authentication Routes
    Route::post("login",[AuthController::class, "login"]);

    Route::middleware("auth:sanctum")->group(function (){

        // Logout Route
        Route::post("logout",[AuthController::class, "logout"]);

        // Refresh Token Route
        Route::post("refresh",[AuthController::class, "refresh"]);

        // Get Authenticated User Route
        Route::get("user",[AuthController::class, "user"]);

        // Delete Authenticated User
        Route::delete("user",[AuthController::class, "delete"]);

    });

});

// check for permissions middleware using laratrust
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/', [HomeController::class, 'index']);

    // get all roles for users
    Route::get('/roles', [RolesController::class, 'index'])->name('roles.index');

    // create a role for a user
    Route::get('/roles/create', [RolesController::class, 'create']);

    // store a role for a user
    Route::post('/roles/store', [RolesController::class, 'store']);

    // edit a role for a user
    Route::get('/roles/edit/{id}', [RolesController::class, 'edit']);

    // get all permissions for users
    Route::get('/permissions', [PermissionsController::class, 'index'])->name('permissions.index');

    // create a permission for a user
    Route::get('/permissions/create', [PermissionsController::class, 'create']);

    // store a permission for a user
    Route::post('/permissions/store', [PermissionsController::class, 'store']);

    // edit a permission for a user
    Route::get('/permissions/edit/{id}', [PermissionsController::class, 'edit']);

    // delete a permission for a user
    Route::delete('/permissions/delete/{id}', [PermissionsController::class, 'destroy']);

    // stripe add payment method
    Route::post('/stripe', [StripeController::class, 'addPaymentMethod']);

    // stripe create session
    Route::get('/stripe/create-session', [StripeController::class, 'createSession']);
});

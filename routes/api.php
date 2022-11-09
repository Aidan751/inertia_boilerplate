<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\StripeController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\PermissionsController;
use App\Http\Controllers\Api\AdminRestaurantsController;
use App\Http\Controllers\Api\AdminCallCentreUserController;

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

    // create a new restaurant
Route::post('/restaurants', [AdminRestaurantsController::class, 'store']);

// get all restaurants
Route::get('/restaurants', [AdminRestaurantsController::class, 'index']);
// just to test edit works
Route::get('/restaurants/{id}', [AdminRestaurantsController::class, 'edit']);
// update a restaurant
Route::put('/restaurants/{id}', [AdminRestaurantsController::class, 'update']);

// list call centre users
Route::get('/call-centre-users', [AdminCallCentreUserController::class, 'index']);

// list orders
Route::get('/orders', [OrderController::class, 'getAll']);

// get all orders for the restaurant
Route::get('/orders/{restaurant}', [OrderController::class, 'getOrders']);

// add a new order
Route::post('/orders', [OrderController::class, 'add']);

// list orders
Route::get('/orders', [OrderController::class, 'list']);

// get a single order
Route::get('/orders/{id}', [OrderController::class, 'show']);

// polls for order
Route::get('/order/{id}/polling', [OrderController::class, 'poll']);

// check if fares are available
Route::get('/orders/available-fares', [OrderController::class, 'availableFares']);

// update an order
Route::put('/orders/{id}', [OrderController::class, 'update']);

// delete an order
Route::delete('/orders/{id}', [OrderController::class, 'destroy']);


Route::post('/stripe/payment', [StripeController::class, 'addPaymentMethod']);

Route::get('/stripe/create-session', [StripeController::class, 'createSession']);


Route::put('/driver', [DriverController::class, 'update']);
Route::get('/driver', [DriverController::class, 'get']);
Route::post('/driver', [DriverController::class, 'create']);
Route::get('/driver/nearest', [DriverController::class, 'nearest']);

Route::post('/review', [ReviewController::class, 'create']);



Route::get('/address', [AddressController::class, 'list']);
Route::post('/address', [AddressController::class, 'add']);
Route::delete('/address/{id}', [AddressController::class, 'delete']);


Route::get('/report/{id}', [ReportController::class, 'add']);
Route::post('/location', [LocationController::class, 'update']);
Route::post('/location/generate', [LocationController::class, 'generate']);
Route::get('/location', [LocationController::class, 'get']);
});
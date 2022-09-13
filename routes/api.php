<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// check for permissions middleware using laratrust
Route::middleware(['permission:read-roles'])->group(function () {
    Route::get('/', [HomeController::class, 'index']);

    // get all roles for users
    Route::get('/roles', [RolesController::class, 'index']);

    // create a role for a user
    Route::get('/roles/create', [RolesController::class, 'create']);

    // store a role for a user
    Route::post('/roles/store', [RolesController::class, 'store']);

    // edit a role for a user
    Route::get('/roles/edit/{id}', [RolesController::class, 'edit']);
});
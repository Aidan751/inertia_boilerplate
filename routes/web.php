<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Auth\LoginController;

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

// create login and register routes
Route::get('/login', [LoginController::class, 'create'])->name('login');

// check for permissions middleware using laratrust
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('dashboard');

    // get all roles for users
    Route::get('/roles', [RolesController::class, 'index'])->name('roles.index');

    // create a role for a user
    Route::get('/roles/create', [RolesController::class, 'create'])->name('roles.create');

    // store a role for a user
    Route::post('/roles/store', [RolesController::class, 'store'])->name('roles.store');

    // edit a role for a user
    Route::get('/roles/edit/{id}', [RolesController::class, 'edit'])->name('roles.edit');

    // get all permissions for users
    Route::get('/permissions', [PermissionsController::class, 'index'])->name('permissions.index');

    // create a permission for a user
    Route::get('/permissions/create', [PermissionsController::class, 'create'])->name('permissions.create');

    // store a permission for a user
    Route::post('/permissions/store', [PermissionsController::class, 'store'])->name('permissions.store');

    // edit a permission for a user
    Route::get('/permissions/edit/{id}', [PermissionsController::class, 'edit'])->name('permissions.edit');

    // delete a permission for a user
    Route::delete('/permissions/delete/{id}', [PermissionsController::class, 'destroy'])->name('permissions.destroy');
});
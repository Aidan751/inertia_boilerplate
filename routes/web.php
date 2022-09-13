<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// check for permissions middleware using laratrust
Route::middleware(['permission:read-roles'])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('dashboard');

    // get all roles for users
    Route::get('/roles', [RolesController::class, 'index'])->name('roles.index');

    // create a role for a user
    Route::get('/roles/create', [RolesController::class, 'create'])->name('roles.create');

    // store a role for a user
    Route::post('/roles/store', [RolesController::class, 'store'])->name('roles.store');

    // edit a role for a user
    Route::get('/roles/edit/{id}', [RolesController::class, 'edit'])->name('roles.edit');
});
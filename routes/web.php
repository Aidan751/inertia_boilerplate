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

Route::middleware(['auth', 'verified'])->group(function () {
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

    // create an admin user
    Route::get('/admin-user/create', [AdminUserController::class, 'create'])->name('admin-user.create');

    // get all admin users
    Route::get('/admin-user', [AdminUserController::class, 'index'])->name('admin-user.index');

    // store an admin user
    Route::post('/admin-user/store', [AdminUserController::class, 'store'])->name('admin-user.store');

    // edit an admin user
    Route::get('/admin-user/edit/{id}', [AdminUserController::class, 'edit'])->name('admin-user.edit');

    // update an admin user
    Route::put('/admin-user/update/{id}', [AdminUserController::class, 'update'])->name('admin-user.update');

    // delete an admin user
    Route::delete('/admin-user/delete/{id}', [AdminUserController::class, 'destroy'])->name('admin-user.destroy');

    // create a call center user
    Route::get('/admin-callcentreuser/create', [AdminCallCentreUserController::class, 'create'])->name('admin-callcentreuser.create');

    // get all call center users
    Route::get('/admin-callcentreuser', [AdminCallCentreUserController::class, 'index'])->name('admin-callcentreuser.index');

    // store a call center user
    Route::post('/admin-callcentreuser/store', [AdminCallCentreUserController::class, 'store'])->name('admin-callcentreuser.store');

    // edit a call center user
    Route::get('/admin-callcentreuser/edit/{id}', [AdminCallCentreUserController::class, 'edit'])->name('admin-callcentreuser.edit');

    // update a call center user
    Route::put('/admin-callcentreuser/update/{id}', [AdminCallCentreUserController::class, 'update'])->name('admin-callcentreuser.update');

    // delete a call center user
    Route::delete('/admin-callcentreuser/delete/{id}', [AdminCallCentreUserController::class, 'destroy'])->name('admin-callcentreuser.destroy');

    // create a restaurant category
    Route::get('/admin-restaurantcategories/create', [AdminRestaurantCategoriesController::class, 'create'])->name('admin-restaurantcategories.create');

    // get all restaurant categories
    Route::get('/admin-restaurantcategories', [AdminRestaurantCategoriesController::class, 'index'])->name('admin-restaurantcategories.index');

    // store a restaurant category
    Route::post('/admin-restaurantcategories/store', [AdminRestaurantCategoriesController::class, 'store'])->name('admin-restaurantcategories.store');

    // edit a restaurant category
    Route::get('/admin-restaurantcategories/edit/{id}', [AdminRestaurantCategoriesController::class, 'edit'])->name('admin-restaurantcategories.edit');

    // update a restaurant category
    Route::put('/admin-restaurantcategories/update/{id}', [AdminRestaurantCategoriesController::class, 'update'])->name('admin-restaurantcategories.update');

    // delete a restaurant category
    Route::delete('/admin-restaurantcategories/delete/{id}', [AdminRestaurantCategoriesController::class, 'destroy'])->name('admin-restaurantcategories.destroy');

    // create a restaurant
    Route::get('/admin-restaurants/create', [AdminRestaurantsController::class, 'create'])->name('admin-restaurants.create');

    // get all restaurants
    Route::get('/admin-restaurants', [AdminRestaurantsController::class, 'index'])->name('admin-restaurants.index');

    // store a restaurant
    Route::post('/admin-restaurants/store', [AdminRestaurantsController::class, 'store'])->name('admin-restaurants.store');

    // edit a restaurant
    Route::get('/admin-restaurants/edit/{id}', [AdminRestaurantsController::class, 'edit'])->name('admin-restaurants.edit');

    // update a restaurant
    Route::put('/admin-restaurants/update/{id}', [AdminRestaurantsController::class, 'update'])->name('admin-restaurants.update');

    // delete a restaurant
    Route::delete('/admin-restaurants/delete/{id}', [AdminRestaurantsController::class, 'destroy'])->name('admin-restaurants.destroy');

    // get all applications
    Route::get('/admin-applications', [AdminApplicationsController::class, 'index'])->name('admin-applications.index');

    // create a driver
    Route::get('/admin-driver/create', [AdminDriverController::class, 'create'])->name('admin-driver.create');

    // get all drivers
    Route::get('/admin-driver', [AdminDriverController::class, 'index'])->name('admin-driver.index');

    // store a driver
    Route::post('/admin-driver/store', [AdminDriverController::class, 'store'])->name('admin-driver.store');

    // edit a driver
    Route::get('/admin-driver/edit/{id}', [AdminDriverController::class, 'edit'])->name('admin-driver.edit');

    // update a driver
    Route::put('/admin-driver/update/{id}', [AdminDriverController::class, 'update'])->name('admin-driver.update');

    // delete a driver
    Route::delete('/admin-driver/delete/{id}', [AdminDriverController::class, 'destroy'])->name('admin-driver.destroy');

    // get all delivery costs
    Route::get('/admin-configurations', [AdminConfigurationsController::class, 'index'])->name('admin-configurations.index');

    // update delivery costs
    Route::put('/admin-configurations/update/{id}', [AdminConfigurationsController::class, 'update'])->name('admin-configurations.update');

});

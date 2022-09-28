<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\Web\OrderController;
use App\Http\Controllers\Web\RolesController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Web\AdminUserController;
use App\Http\Controllers\Web\AdminRestaurantsController;
use App\Http\Controllers\Web\AdminCallCentreUserController;
use App\Http\Controllers\Web\AdminRestaurantCategoriesController;

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
    // handle stripe payments
    Route::get('/pay', [ItemPaymentController::class, 'index'])->name('pay');
    Route::post('/pay', [ItemPaymentController::class, 'store'])->name('pay.store');

    // route to main admin dashboard
    Route::get('/', [HomeController::class, 'index'])->name('mainAdmin.dashboard');
    // route to restaurant admin dashboard
    Route::get('/restaurant-admin', [RestaurantAdminController::class, 'index'])->name('restaurantAdmin.dashboard');
    // route to call center admin dashboard
    Route::get('/call-center-admin', [CallCentreAdminController::class, 'index'])->name('CallCentreAdmin.dashboard');


    // get all roles for users
    Route::get('/roles', [RolesController::class, 'index'])->name('roles.index');

    // create a role for a user
    Route::get('/roles/create', [RolesController::class, 'create'])->name('roles.create');

    // store a role for a user
    Route::post('/roles/store', [RolesController::class, 'store'])->name('roles.store');

    // edit a role for a user
    Route::get('/roles/edit/{role}', [RolesController::class, 'edit'])->name('roles.edit');

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
    Route::get('/admin-user/edit/{user}', [AdminUserController::class, 'edit'])->name('admin-user.edit');

    // update an admin user
    Route::put('/admin-user/update/{user}', [AdminUserController::class, 'update'])->name('admin-user.update');

    // delete an admin user
    Route::delete('/admin-user/delete/{user}', [AdminUserController::class, 'destroy'])->name('admin-user.destroy');

    // create a call center user
    Route::get('/admin-callcentreuser/create', [AdminCallCentreUserController::class, 'create'])->name('admin-callcentreuser.create');

    // get all call center users
    Route::get('/admin-callcentreuser', [AdminCallCentreUserController::class, 'index'])->name('admin-callcentreuser.index');

    // store a call center user
    Route::post('/admin-callcentreuser/store', [AdminCallCentreUserController::class, 'store'])->name('admin-callcentreuser.store');

    // edit a call center user
    Route::get('/admin-callcentreuser/edit/{user}', [AdminCallCentreUserController::class, 'edit'])->name('admin-callcentreuser.edit');

    // update a call center user
    Route::put('/admin-callcentreuser/update/{user}', [AdminCallCentreUserController::class, 'update'])->name('admin-callcentreuser.update');

    // delete a call center user
    Route::delete('/admin-callcentreuser/delete/{user}', [AdminCallCentreUserController::class, 'destroy'])->name('admin-callcentreuser.destroy');

    // create a restaurant category
    Route::get('/admin-restaurantcategories/create', [AdminRestaurantCategoriesController::class, 'create'])->name('admin-restaurantcategories.create');

    // get all restaurant categories
    Route::get('/admin-restaurantcategories', [AdminRestaurantCategoriesController::class, 'index'])->name('admin-restaurantcategories.index');

    // store a restaurant category
    Route::post('/admin-restaurantcategories/store', [AdminRestaurantCategoriesController::class, 'store'])->name('admin-restaurantcategories.store');

    // edit a restaurant category
    Route::get('/admin-restaurantcategories/edit/{category}', [AdminRestaurantCategoriesController::class, 'edit'])->name('admin-restaurantcategories.edit');

    // update a restaurant category
    Route::put('/admin-restaurantcategories/update/{category}', [AdminRestaurantCategoriesController::class, 'update'])->name('admin-restaurantcategories.update');

    // delete a restaurant category
    Route::delete('/admin-restaurantcategories/delete/{category}', [AdminRestaurantCategoriesController::class, 'destroy'])->name('admin-restaurantcategories.destroy');

    // create a restaurant
    Route::get('/admin-restaurants/create', [AdminRestaurantsController::class, 'create'])->name('admin-restaurants.create');

    // get all restaurants
    Route::get('/admin-restaurants', [AdminRestaurantsController::class, 'index'])->name('admin-restaurants.index');

    // store a restaurant
    Route::post('/admin-restaurants/store', [AdminRestaurantsController::class, 'store'])->name('admin-restaurants.store');

    // edit a restaurant
    Route::get('/admin-restaurants/edit/{restaurant}', [AdminRestaurantsController::class, 'edit'])->name('admin-restaurants.edit');

    // update a restaurant
    Route::put('/admin-restaurants/update/{restaurant}', [AdminRestaurantsController::class, 'update'])->name('admin-restaurants.update');

    // delete a restaurant
    Route::delete('/admin-restaurants/delete/{restaurant}', [AdminRestaurantsController::class, 'destroy'])->name('admin-restaurants.destroy');

    Route::view('/restaurant/restaurant-tables', 'livewire.table_numbers')->name('restaurant.alltables');

    // TODO: stripe routes
    Route::get('/restaurant/stripe', [RestaurantStripeController::class, 'link'])->name('stripe.link');
    Route::get('/restaurant/stripe/complete', [RestaurantStripeController::class, 'complete'])->name('stripe.complete');
    Route::post('/restaurant/order/{id}/push', [OrderController::class, 'sendPush'])->name('order.push');



    // list menu categories
    Route::get('/restaurant/menu-categories', [MenuCategoryController::class, 'index'])->name('menu-categories.index');

    // create a menu category
    Route::get('/restaurant/menu-categories/create', [MenuCategoryController::class, 'create'])->name('menu-categories.create');

    // store a menu category
    Route::post('/restaurant/menu-categories/store', [MenuCategoryController::class, 'store'])->name('menu-categories.store');

    // edit a menu category
    Route::get('/restaurant/menu-categories/edit/{id}', [MenuCategoryController::class, 'edit'])->name('menu-categories.edit');

    // update a menu category
    Route::put('/restaurant/menu-categories/update/{id}', [MenuCategoryController::class, 'update'])->name('menu-categories.update');

    // delete a menu category
    Route::delete('/restaurant/menu-categories/delete/{id}', [MenuCategoryController::class, 'destroy'])->name('menu-categories.destroy');

    // list menu items
    Route::get('/restaurant/menu-items', [MenuItemController::class, 'index'])->name('menu-items.index');

    // create a menu item
    Route::get('/restaurant/menu-items/create', [MenuItemController::class, 'create'])->name('menu-items.create');

    // store a menu item
    Route::post('/restaurant/menu-items/store', [MenuItemController::class, 'store'])->name('menu-items.store');

    // edit a menu item
    Route::get('/restaurant/menu-items/edit/{id}', [MenuItemController::class, 'edit'])->name('menu-items.edit');

    // update a menu item
    Route::put('/restaurant/menu-items/update/{id}', [MenuItemController::class, 'update'])->name('menu-items.update');

    // delete a menu item
    Route::delete('/restaurant/menu-items/delete/{id}', [MenuItemController::class, 'destroy'])->name('menu-items.destroy');

    // list group deals
    Route::get('/restaurant/group-deals', [GroupDealController::class, 'index'])->name('group-deals.index');

    // create a group deal
    Route::get('/restaurant/group-deals/create', [GroupDealController::class, 'create'])->name('group-deals.create');

    // store a group deal
    Route::post('/restaurant/group-deals/store', [GroupDealController::class, 'store'])->name('group-deals.store');

    // edit a group deal
    Route::get('/restaurant/group-deals/edit/{id}', [GroupDealController::class, 'edit'])->name('group-deals.edit');

    // update a group deal
    Route::put('/restaurant/group-deals/update/{id}', [GroupDealController::class, 'update'])->name('group-deals.update');

    // delete a group deal
    Route::delete('/restaurant/group-deals/delete/{id}', [GroupDealController::class, 'destroy'])->name('group-deals.destroy');

    //list extras
    Route::get('/restaurant/extras', [ExtraController::class, 'index'])->name('extras.index');

    // create an extra
    Route::get('/restaurant/extras/create', [ExtraController::class, 'create'])->name('extras.create');

    // store an extra
    Route::post('/restaurant/extras/store', [ExtraController::class, 'store'])->name('extras.store');

    // edit an extra
    Route::get('/restaurant/extras/edit/{id}', [ExtraController::class, 'edit'])->name('extras.edit');

    // update an extra
    Route::put('/restaurant/extras/update/{id}', [ExtraController::class, 'update'])->name('extras.update');

    // list tables
    Route::get('/restaurant/tables', [TableController::class, 'index'])->name('tables.index');

    // create a table
    Route::get('/restaurant/tables/create', [TableController::class, 'create'])->name('tables.create');

    // store a table
    Route::post('/restaurant/tables/store', [TableController::class, 'store'])->name('tables.store');

    // edit a table
    Route::get('/restaurant/tables/edit/{id}', [TableController::class, 'edit'])->name('tables.edit');

    // update a table
    Route::put('/restaurant/tables/update/{id}', [TableController::class, 'update'])->name('tables.update');

    // delete a table
    Route::delete('/restaurant/tables/delete/{id}', [TableController::class, 'destroy'])->name('tables.destroy');

    // list operating hours
    Route::get('/restaurant/operating-hours', [OperatingHourController::class, 'index'])->name('operating-hours.index');

    // create an operating hour
    Route::get('/restaurant/operating-hours/create', [OperatingHourController::class, 'create'])->name('operating-hours.create');

    // store an operating hour
    Route::post('/restaurant/operating-hours/store', [OperatingHourController::class, 'store'])->name('operating-hours.store');

    // edit an operating hour
    Route::get('/restaurant/operating-hours/edit/{id}', [OperatingHourController::class, 'edit'])->name('operating-hours.edit');

    // update an operating hour
    Route::put('/restaurant/operating-hours/update/{id}', [OperatingHourController::class, 'update'])->name('operating-hours.update');

    // delete an operating hour
    Route::delete('/restaurant/operating-hours/delete/{id}', [OperatingHourController::class, 'destroy'])->name('operating-hours.destroy');

    // delete an extra
    Route::delete('/restaurant/extras/delete/{id}', [ExtraController::class, 'destroy'])->name('extras.destroy');

    // show company profile
    Route::get('/restaurant/profile', [CompanyProfileController::class, 'show'])->name('profile.show');

    // edit company profile
    Route::get('/restaurant/profile/edit', [CompanyProfileController::class, 'edit'])->name('profile.edit');

    // update company profile
    Route::put('/restaurant/profile/update', [CompanyProfileController::class, 'update'])->name('profile.update');

    // list offers
    Route::get('/restaurant/offers', [OfferController::class, 'index'])->name('offers.index');

    // create an offer
    Route::get('/restaurant/offers/create', [OfferController::class, 'create'])->name('offers.create');

    // store an offer
    Route::post('/restaurant/offers/store', [OfferController::class, 'store'])->name('offers.store');

    // edit an offer
    Route::get('/restaurant/offers/edit/{offer}', [OfferController::class, 'edit'])->name('offers.edit');

    // update an offer
    Route::put('/restaurant/offers/update/{offer}', [OfferController::class, 'update'])->name('offers.update');

    // delete an offer
    Route::delete('/restaurant/offers/delete/{offer}', [OfferController::class, 'destroy'])->name('offers.destroy');

    // list orders
    Route::get('/restaurant/orders/{user}', [OrderController::class, 'index'])->name('admin.orders.index');

    // show an order
    Route::get('/restaurant/orders/show/{order}', [OrderController::class, 'show'])->name('admin.orders.show');

    // list order items
    Route::get('/restaurant/orders/items/{order}', [OrderItemController::class, 'index'])->name('admin.orders.items.index');

    // show an order item
    Route::get('/restaurant/orders/items/show/{orderItem}', [OrderItemController::class, 'show'])->name('admin.orders.items.show');

    // list order items
    Route::get('/restaurant/orders/items/{order}/edit', [OrderItemController::class, 'edit'])->name('admin.orders.items.edit');

    // list order items
    Route::put('/restaurant/orders/items/{order}/update', [OrderItemController::class, 'update'])->name('admin.orders.items.update');

    // delete order items
    Route::delete('/restaurant/orders/items/{order}/delete', [OrderItemController::class, 'destroy'])->name('admin.orders.items.destroy');


    // create an order
    Route::get('/restaurant/orders/create', [OrderController::class, 'create'])->name('orders.create');

    // store an order
    Route::post('/restaurant/orders/store', [OrderController::class, 'store'])->name('orders.store');

    // edit an order
    Route::get('/restaurant/orders/edit/{order}', [OrderController::class, 'edit'])->name('orders.edit');

    // update an order
    Route::put('/restaurant/orders/update/{order}', [OrderController::class, 'update'])->name('orders.update');

    // delete an order
    Route::delete('/restaurant/orders/delete/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');



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
    Route::put('/admin-configurations/update/', [AdminConfigurationsController::class, 'update'])->name('admin-configurations.update');

    // get all orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    // livewire views
    // TODO: rework these routes to be rendered as inertia views
    // Route::view('/restaurant/restaurant-operatinghours', 'livewire.home')->name('restaurant.operating');

    // Route::view('/restaurant/restaurant-tables', 'livewire.table_numbers')->name('restaurant.alltables');
});


require __DIR__ . "/auth.php";
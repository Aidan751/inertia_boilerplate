<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\OrderController;
use App\Http\Controllers\Web\RolesController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Web\AdminUserController;
use App\Http\Controllers\Web\OrderItemController;
use App\Http\Controllers\Web\AdminDriverController;
use App\Http\Controllers\Web\AdminDriverTripsController;
use App\Http\Controllers\Web\AdminRestaurantsController;
use App\Http\Controllers\Web\Restaurant\ExtraController;
use App\Http\Controllers\Web\Restaurant\OfferController;
use App\Http\Controllers\Web\Restaurant\TableController;
use App\Http\Controllers\Web\AdminApplicationsController;
use App\Http\Controllers\Web\Restaurant\StripeController;
use App\Http\Controllers\Web\AdminCallCentreUserController;
use App\Http\Controllers\Web\AdminConfigurationsController;
use App\Http\Controllers\Web\Restaurant\MenuItemController;
use App\Http\Controllers\Web\Restaurant\GroupDealController;
use App\Http\Controllers\Web\Restaurant\OpeningHourController;
use App\Http\Controllers\Web\Restaurant\MenuCategoryController;
use App\Http\Controllers\Web\AdminRestaurantCategoriesController;
use App\Http\Controllers\Web\CallCentre\OrderController as CallCentreOrderController;
use App\Http\Controllers\Web\CallCentre\OrderHistoryController as CallCentreOrderHistoryController;
use App\Http\Controllers\Web\Restaurant\OrderController as RestaurantOrderController;
use App\Http\Controllers\Web\Restaurant\AdminUserController as RestaurantAdminUserController;
use App\Http\Controllers\Web\Restaurant\ConfigurationController as RestaurantConfigurationController;
use App\Http\Controllers\Web\Restaurant\StripeController as RestaurantStripeController;

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

    // handle stripe payments
    Route::post('/pay', [ItemPaymentController::class, 'store'])->name('pay.store');

    // route to main admin dashboard
    Route::get('/', [HomeController::class, 'index'])->name('mainAdmin.dashboard');
    // route to restaurant admin dashboard
    Route::get('/restaurant-admin', [RestaurantAdminController::class, 'index'])->name('restaurantAdmin.dashboard');
    // route to call center admin dashboard
    Route::get('/call-center-admin', [CallCentreAdminController::class, 'index'])->name('callCentreAdmin.dashboard');

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
    Route::put('/admin-restaurants/update/{id}', [AdminRestaurantsController::class, 'update'])->name('admin-restaurants.update');

    // delete a restaurant
    Route::delete('/admin-restaurants/delete/{restaurant}', [AdminRestaurantsController::class, 'destroy'])->name('admin-restaurants.destroy');

    Route::view('/restaurant/restaurant-tables', 'livewire.table_numbers')->name('restaurant.alltables');

    // TODO: stripe routes
    Route::get('/restaurant/stripe', [RestaurantStripeController::class, 'link'])->name('restaurant.stripe.link');
    Route::get('/restaurant/stripe/complete', [RestaurantStripeController::class, 'complete'])->name('restaurant.stripe.complete');

    // list menu categories
    Route::get('/restaurant/menu-categories', [MenuCategoryController::class, 'index'])->name('restaurant.categories.index');

    // create a menu category
    Route::get('/restaurant/menu-categories/create', [MenuCategoryController::class, 'create'])->name('restaurant.categories.create');

    // store a menu category
    Route::post('/restaurant/menu-categories/store', [MenuCategoryController::class, 'store'])->name('restaurant.categories.store');

    // edit a menu category
    Route::get('/restaurant/menu-categories/edit/{id}', [MenuCategoryController::class, 'edit'])->name('restaurant.categories.edit');

    // update a menu category
    Route::put('/restaurant/menu-categories/update/{id}', [MenuCategoryController::class, 'update'])->name('restaurant.categories.update');

    // delete a menu category
    Route::delete('/restaurant/menu-categories/delete/{id}', [MenuCategoryController::class, 'destroy'])->name('restaurant.categories.destroy');

    // list menu items
    Route::get('/restaurant/menu-items', [MenuItemController::class, 'index'])->name('restaurant.menu-items.index');

    // create a menu item
    Route::get('/restaurant/menu-items/create', [MenuItemController::class, 'create'])->name('restaurant.menu-items.create');

    // store a menu item
    Route::post('/restaurant/menu-items/store', [MenuItemController::class, 'store'])->name('restaurant.menu-items.store');

    // edit a menu item
    Route::get('/restaurant/menu-items/edit/{id}', [MenuItemController::class, 'edit'])->name('restaurant.menu-items.edit');

    // update a menu item
    Route::put('/restaurant/menu-items/update/{id}', [MenuItemController::class, 'update'])->name('restaurant.menu-items.update');

    // delete a menu item
    Route::delete('/restaurant/menu-items/delete/{id}', [MenuItemController::class, 'destroy'])->name('restaurant.menu-items.destroy');

    // list tables
    Route::get('/restaurant/tables', [TableController::class, 'index'])->name('restaurant.tables.index');

    // create a table
    Route::get('/restaurant/tables/create', [TableController::class, 'create'])->name('restaurant.tables.create');

    // store a table
    Route::post('/restaurant/tables/store', [TableController::class, 'store'])->name('restaurant.tables.store');

    // edit a table
    Route::get('/restaurant/tables/edit/{tableNumber}', [TableController::class, 'edit'])->name('restaurant.tables.edit');

    // update a table
    Route::put('/restaurant/tables/update/{tableNumber}', [TableController::class, 'update'])->name('restaurant.tables.update');

    // delete a table
    Route::delete('/restaurant/tables/delete/{tableNumber}', [TableController::class, 'destroy'])->name('restaurant.tables.destroy');

    // edit an opening hour
    Route::get('/restaurant/opening-hours/edit/{id}', [OpeningHourController::class, 'edit'])->name('restaurant.opening-hours.edit');

    // update an opening hour
    Route::put('/restaurant/opening-hours/update', [OpeningHourController::class, 'update'])->name('restaurant.opening-hours.update');


    // show company profile
    Route::get('/admin/profile', [CompanyProfileController::class, 'show'])->name('profile.show');

    // edit company profile
    Route::get('/admin/profile/edit', [CompanyProfileController::class, 'edit'])->name('profile.edit');

    // update company profile
    Route::put('/admin/profile/update', [CompanyProfileController::class, 'update'])->name('profile.update');

    // list orders
    Route::get('/admin/orders/{user}', [OrderController::class, 'index'])->name('admin.orders.index');

    // show an order
    Route::get('/admin/orders/show/{order}', [OrderController::class, 'show'])->name('admin.orders.show');

    // list order items
    Route::get('/admin/orders/items/{order}', [OrderItemController::class, 'index'])->name('admin.orders.items.index');

    // show an order item
    Route::get('/admin/orders/items/show/{orderItem}', [OrderItemController::class, 'show'])->name('admin.orders.items.show');

    // list order items
    Route::get('/admin/orders/items/{order}/edit', [OrderItemController::class, 'edit'])->name('admin.orders.items.edit');

    // list order items
    Route::put('/admin/orders/items/{order}/update', [OrderItemController::class, 'update'])->name('admin.orders.items.update');

    // delete order items
    Route::delete('/admin/orders/items/{order}/delete', [OrderItemController::class, 'destroy'])->name('admin.orders.items.destroy');


    // list restaurant users
    Route::get('/restaurant/users/', [RestaurantAdminUserController::class, 'index'])->name('restaurant.users.index');

    // create a restaurant user
    Route::get('/restaurant/users/create/', [RestaurantAdminUserController::class, 'create'])->name('restaurant.users.create');

    // store a restaurant user
    Route::post('/restaurant/users/store/', [RestaurantAdminUserController::class, 'store'])->name('restaurant.users.store');

    // edit a restaurant user
    Route::get('/restaurant/users/edit/{user}', [RestaurantAdminUserController::class, 'edit'])->name('restaurant.users.edit');

    // update a restaurant user
    Route::put('/restaurant/users/update/{user}', [RestaurantAdminUserController::class, 'update'])->name('restaurant.users.update');

    // delete a restaurant user
    Route::delete('/restaurant/users/delete/{user}', [RestaurantAdminUserController::class, 'destroy'])->name('restaurant.users.destroy');

    // show a single restaurant order
    Route::get('/restaurant/orders/show/{order}', [RestaurantOrderController::class, 'show'])->name('restaurant.orders.show');

    // list restaurant orders
    Route::get('/restaurant/orders/{id}', [RestaurantOrderController::class, 'index'])->name('restaurant.orders.index');

    // create an order
    Route::get('/restaurant/orders/create', [RestaurantOrderController::class, 'create'])->name('restaurant.orders.create');

    // store an order
    Route::post('/restaurant/orders/store', [RestaurantOrderController::class, 'store'])->name('restaurant.orders.store');

    // edit an order
    Route::get('/restaurant/orders/edit/{order}', [RestaurantOrderController::class, 'edit'])->name('restaurant.orders.edit');

    // update an order
    Route::put('/restaurant/orders/update/{order}', [RestaurantOrderController::class, 'update'])->name('restaurant.orders.update');

    // update a restaurant orders status
    Route::put('/restaurant/orders/{id}/update', [RestaurantOrderController::class, 'update'])->name('restaurant.orders.status.update');

    // send push to customer
    Route::post('/restaurant/order/{id}/push', [OrderController::class, 'sendPush'])->name('admin.orders.sendPush');


    // delete an order
    Route::delete('/restaurant/orders/delete/{order}', [RestaurantOrderController::class, 'destroy'])->name('restaurant.orders.destroy');

    // list restaurant menu categories
    Route::get('/restaurant/menu/categories', [MenuCategoryController::class, 'index'])->name('restaurant.menu.categories.index');

    // create a restaurant menu category
    Route::get('/restaurant/menu/categories/create', [MenuCategoryController::class, 'create'])->name('restaurant.menu.categories.create');

    // store a restaurant menu category
    Route::post('/restaurant/menu/categories/store', [MenuCategoryController::class, 'store'])->name('restaurant.menu.categories.store');

    // edit a restaurant menu category
    Route::get('/restaurant/menu/categories/edit/{menuCategory}', [MenuCategoryController::class, 'edit'])->name('restaurant.menu.categories.edit');

    // update a restaurant menu category
    Route::put('/restaurant/menu/categories/update/{menuCategory}', [MenuCategoryController::class, 'update'])->name('restaurant.menu.categories.update');

    // delete a restaurant menu category
    Route::delete('/restaurant/menu/categories/delete/{menuCategory}', [MenuCategoryController::class, 'destroy'])->name('restaurant.menu.categories.destroy');

    // list restaurant menu items
    Route::get('/restaurant/menu/items', [MenuItemController::class, 'index'])->name('restaurant.menu.items.index');

    // create a restaurant menu item
    Route::get('/restaurant/menu/items/create', [MenuItemController::class, 'create'])->name('restaurant.menu.items.create');

    // store a restaurant menu item
    Route::post('/restaurant/menu/items/store', [MenuItemController::class, 'store'])->name('restaurant.menu.items.store');

    // edit a restaurant menu item
    Route::get('/restaurant/menu/items/edit/{menuItem}', [MenuItemController::class, 'edit'])->name('restaurant.menu.items.edit');

    // update a restaurant menu item
    Route::put('/restaurant/menu/items/update/{menuItem}', [MenuItemController::class, 'update'])->name('restaurant.menu.items.update');

    // delete a restaurant menu item
    Route::delete('/restaurant/menu/items/delete/{id}', [MenuItemController::class, 'destroy'])->name('restaurant.menu.items.destroy');

    // list restaurant group deals
    Route::get('/restaurant/group-deals', [GroupDealController::class, 'index'])->name('restaurant.group-deals.index');

    // create a restaurant group deal
    Route::get('/restaurant/group-deals/create', [GroupDealController::class, 'create'])->name('restaurant.group-deals.create');

    // store a restaurant group deal
    Route::post('/restaurant/group-deals/store', [GroupDealController::class, 'store'])->name('restaurant.group-deals.store');

    // edit a restaurant group deal
    Route::get('/restaurant/group-deals/edit/{groupDeal}', [GroupDealController::class, 'edit'])->name('restaurant.group-deals.edit');

    // update a restaurant group deal
    Route::put('/restaurant/group-deals/update/{groupDeal}', [GroupDealController::class, 'update'])->name('restaurant.group-deals.update');

    // delete a restaurant group deal
    Route::delete('/restaurant/group-deals/delete/{groupDeal}', [GroupDealController::class, 'destroy'])->name('restaurant.group-deals.destroy');

    // list restaurant extras
    Route::get('/restaurant/extras', [ExtraController::class, 'index'])->name('restaurant.extras.index');

    // create a restaurant extra
    Route::get('/restaurant/extras/create', [ExtraController::class, 'create'])->name('restaurant.extras.create');

    // store a restaurant extra
    Route::post('/restaurant/extras/store', [ExtraController::class, 'store'])->name('restaurant.extras.store');

    // edit a restaurant extra
    Route::get('/restaurant/extras/edit/{extra}', [ExtraController::class, 'edit'])->name('restaurant.extras.edit');

    // update a restaurant extra
    Route::put('/restaurant/extras/update/{extra}', [ExtraController::class, 'update'])->name('restaurant.extras.update');

    // delete a restaurant extra
    Route::delete('/restaurant/extras/delete/{extra}', [ExtraController::class, 'destroy'])->name('restaurant.extras.destroy');

    // list restaurant offers
    Route::get('/restaurant/offers', [OfferController::class, 'index'])->name('restaurant.offers.index');

    // create a restaurant offer
    Route::get('/restaurant/offers/create', [OfferController::class, 'create'])->name('restaurant.offers.create');

    // store a restaurant offer
    Route::post('/restaurant/offers/store', [OfferController::class, 'store'])->name('restaurant.offers.store');

    // edit a restaurant offer
    Route::get('/restaurant/offers/edit/{offer}', [OfferController::class, 'edit'])->name('restaurant.offers.edit');

    // update a restaurant offer
    Route::put('/restaurant/offers/update/{offer}', [OfferController::class, 'update'])->name('restaurant.offers.update');

    // delete a restaurant offer
    Route::delete('/restaurant/offers/delete/{offer}', [OfferController::class, 'destroy'])->name('restaurant.offers.destroy');

    // edit my restaurant
    Route::get('/my/restaurant/edit', [RestaurantConfigurationController::class, 'edit'])->name('my.restaurant.edit');

    // update my restaurant
    Route::put('/my/restaurant/update/{id}', [RestaurantConfigurationController::class, 'update'])->name('my.restaurant.update');

    // list call centre orders
    Route::get('/call-centre/orders/{id}', [CallCentreOrderController::class, 'index'])->name('call-centre.orders.index');

    // add an order
    Route::get('/call-centre/orders/add-deal/{id}', [CallCentreOrderController::class, 'addDeal'])->name('call-centre.orders.add.deal');

    // update a list of selected items sizes as well as chosen extras
    Route::post('/call-centre/orders/update-items', [CallCentreOrderController::class, 'updateItems'])->name('call-centre.orders.update.deal.items');

    Route::get('/call-centre/orders/add-menu-item/{id}', [CallCentreOrderController::class, 'addMenuItem'])->name('call-centre.orders.add.item');

    // choose sizes
    Route::get('/call-centre/orders/choose-sizes/{id}', [CallCentreOrderController::class, 'chooseSizes'])->name('call-centre.orders.choose-sizes');

    // save size and extra selections
    Route::post('/call-centre/orders/save-size-and-extras', [CallCentreOrderController::class, 'saveSizesAndExtras'])->name('call-centre.orders.save-selections');

    // add selected items to basket
    Route::post('/call-centre/orders/add-to-basket', [CallCentreOrderController::class, 'addToBasket'])->name('call-centre.orders.add-to-basket');

    // search for restaurants and place an order
    Route::get('/call-centre/orders/search/{id}', [CallCentreOrderController::class, 'search'])->name('call-centre.orders.search');


    // add a new order
    Route::post('/call-centre/orders/store', [CallCentreOrderController::class, 'store'])->name('call-centre.orders.store');

    // place order
    Route::post('/call-centre/orders/place-order', [CallCentreOrderController::class, 'placeOrder'])->name('call-centre.orders.place-order');

    // details of an order
    Route::get('/call-centre/orders/index', [CallCentreOrderController::class, 'index'])->name('call-centre.orders.index');

    // list order history
    Route::get('/call-centre/orders/history/{id}', [CallCentreOrderHistoryController::class, 'index'])->name('call-centre.orders.history');

    // store an order
    Route::post('/call-centre/orders/store', [CallCentreOrderController::class, 'store'])->name('call-centre.orders.store');

    // edit an order
    Route::get('/call-centre/orders/edit/{order}', [CallCentreOrderController::class, 'edit'])->name('call-centre.orders.edit');

    // update an order
    Route::put('/call-centre/orders/update/{order}', [CallCentreOrderController::class, 'update'])->name('call-centre.orders.update');

    // delete an order
    Route::delete('/call-centre/orders/delete/{order}', [CallCentreOrderController::class, 'destroy'])->name('call-centre.orders.destroy');

    // get all applications
    Route::get('/admin-applications', [AdminApplicationsController::class, 'index'])->name('admin-applications.index');

    // get one application
    Route::get('/admin-applications/{restaurant}', [AdminApplicationsController::class, 'show'])->name('admin-applications.show');

    // approve an application
    Route::put('/admin-applications/{restaurant}/approve', [AdminApplicationsController::class, 'approve'])->name('admin-applications.approve');

    // reject an application
    Route::put('/admin-applications/{restaurant}/decline', [AdminApplicationsController::class, 'decline'])->name('admin-applications.decline');

    // create a driver
    Route::get('/admin-driver/create', [AdminDriverController::class, 'create'])->name('admin-driver.create');

    // get all drivers
    Route::get('/admin-driver', [AdminDriverController::class, 'index'])->name('admin-driver.index');

    // store a driver
    Route::post('/admin-driver/store', [AdminDriverController::class, 'store'])->name('admin-driver.store');

    // edit a driver
    Route::get('/admin-driver/edit/{id}', [AdminDriverController::class, 'edit'])->name('admin-driver.edit');

    // update a driver
    Route::put('/admin-driver/update/{driver}', [AdminDriverController::class, 'update'])->name('admin-driver.update');

    // delete a driver
    Route::delete('/admin-driver/delete/{driver}', [AdminDriverController::class, 'destroy'])->name('admin-driver.destroy');

    // list driver trips
    Route::get('/admin-driver/trips/{driver}', [AdminDriverTripsController::class, 'index'])->name('admin-driver.trips.index');

    // get all delivery costs
    Route::get('/admin-configurations', [AdminConfigurationsController::class, 'index'])->name('admin-configurations.index');

    // edit delivery costs
    Route::get('/admin-configurations/edit', [AdminConfigurationsController::class, 'edit'])->name('admin-configurations.edit');

    // update delivery costs
    Route::put('/admin-configurations/update', [AdminConfigurationsController::class, 'update'])->name('admin-configurations.update');

    // get all orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    // livewire views
    // TODO: rework these routes to be rendered as inertia views
    // Route::view('/restaurant/restaurant-operatinghours', 'livewire.home')->name('restaurant.operating');

    // Route::view('/restaurant/restaurant-tables', 'livewire.table_numbers')->name('restaurant.alltables');
});

require __DIR__ . "/auth.php";
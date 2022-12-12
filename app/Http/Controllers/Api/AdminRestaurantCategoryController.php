<?php

namespace App\Http\Controllers\Api;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Models\RestaurantCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class AdminRestaurantCategoryController extends Controller
{
/**
 * Display a listing of the resource.
 *
 * @return \Illuminate\Http\Response
 */
public function index(Request $request)
{
    $restaurantCategories = RestaurantCategory::all();
    return response()->json($restaurantCategories);
}


/**
 * Display a listing of the resource with pagination.
 *
 * @return \Illuminate\Http\Response
 */
public function list(Request $request)
{
    $restaurantCategories = RestaurantCategory::paginate(10);
    return response()->json($restaurantCategories);
}



/**
 * Store a newly created resource in storage.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
public function store(Request $request)
{
    $restaurantCategory = RestaurantCategory::create([
        'name' => $request->name,
    ]);
    return response()->json($restaurantCategory);
}

/**
 * Display the specified resource.
 *
 * @param  \App\Models\RestaurantCategory  $restaurantCategory
 * @return \Illuminate\Http\Response
 */
public function show(RestaurantCategory $restaurantCategory)
{
    return response()->json($restaurantCategory);
}

/**
 * Update the specified resource in storage.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \App\Models\RestaurantCategory  $restaurantCategory
 * @return \Illuminate\Http\Response
 */
public function update(Request $request, RestaurantCategory $restaurantCategory)
{
    $restaurantCategory->update([
        'name' => $request->name,
    ]);
    return response()->json($restaurantCategory);
}

/**
 * Remove the specified resource from storage.
 *
 * @param  \App\Models\RestaurantCategory  $restaurantCategory
 * @return \Illuminate\Http\Response
 */
public function delete(RestaurantCategory $restaurantCategory)
{
    $restaurantCategory->delete();

    // return response
    return response()->json([
        'message' => 'Restaurant category deleted successfully',
    ]);
}
}
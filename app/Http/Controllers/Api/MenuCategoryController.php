<?php

namespace App\Http\Controllers\Api;

use App\Models\Restaurant;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MenuCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request) {
        $menuCategories = MenuCategory::paginate(10);

        return response()->json([
            "data" => $menuCategories
        ], 200);
    }

    /**
     * Display all menu categories.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $menuCategories = MenuCategory::all();

        return response()->json([
            "data" => $menuCategories
        ], 200);
    }

    /**
     * Display the specified resource.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function show(Request $request, MenuCategory $menuCategory) {
        if ($menuCategory == null) {
            return response()->json([
                "message" => "Menu category not found"
            ], 404);
        }

        return response()->json([
            "data" => $menuCategory
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        // get the restaurant to access the id
        $restaurant = Restaurant::where('id', Auth::user()->restaurant_id)->first();

        // validate request
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'notes' => 'string|max:255'
        ]);

        $menuCategory = MenuCategory::create([
            'title' => $request->title,
            'notes' => $request->notes,
            'restaurant_id' => $restaurant->id
        ]);


        return response()->json([
            "data" => $menuCategory
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MenuCategory $menuCategory) {
        if ($menuCategory == null) {
            return response()->json([
                "message" => "Menu category not found"
            ], 404);
        }

        // validate request
        $this->validate($request, [
            'title' => 'required|string|max:255',
            'notes' => 'string|max:255'
        ]);

        $menuCategory->title = is_null($request->title) ? $menuCategory->title : $request->title;
        $menuCategory->notes = is_null($request->notes) ? $menuCategory->notes : $request->notes;
        $menuCategory->save();

        return response()->json([
            "data" => $menuCategory
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, MenuCategory $menuCategory) {
        if ($menuCategory == null) {
            return response()->json([
                "message" => "Menu category not found"
            ], 404);
        }

        $menuCategory->delete();

        return response()->json([
            "message" => "Menu category deleted"
        ], 200);
    }
}
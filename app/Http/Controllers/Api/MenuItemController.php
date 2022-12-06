<?php

namespace App\Http\Controllers\Api;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use App\Packages\ImagePackage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MenuItemController extends Controller
{
     /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request) {
        $menuItems = MenuItem::paginate(10);

        // loop through menu items and load all menu items extras and sizes
        foreach ($menuItems as $menuItem) {
            $menuItem->load('extras');
            $menuItem->load('sizes');
        }

        return response()->json([
            "data" => $menuItems
        ], 200);
    }

    /**
     * Display all menu items.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $menuItems = MenuItem::all();

        // loop through menu items and load all menu items extras and sizes
        foreach ($menuItems as $menuItem) {
            $menuItem->load('extras');
            $menuItem->load('sizes');
        }

        return response()->json([
            "data" => $menuItems
        ], 200);
    }

    /**
     * Display the specified resource.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function show(Request $request, MenuItem $menuItem) {
        if ($menuItem == null) {
            return response()->json([
                "message" => "Menu item not found"
            ], 404);
        }

        $menuItem->load('extras');
        $menuItem->load('sizes');

        return response()->json([
            "data" => $menuItem
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required',
            'dietary_requirements' => 'nullable|string',
            'image' => 'nullable',
            'menu_category_id' => 'required',
            'extras' => 'nullable|array',
            'sizes' => 'nullable|array'
        ]);

        $menuItem = MenuItem::create([
            'title' => $request->title,
            'description' => $request->description,
            'dietary_requirements' => $request->dietary_requirements,
            'price' => $request->price,
            'image' => $request->hasFile('image') ? ImagePackage::save($request->file('image'), 'menu_items') : null,
            'menu_category_id' => $request->menu_category_id,
            'restaurant_id' => Auth::user()->restaurant_id,
        ]);


        // loop through extras in request and find the extra with the id and attach it to the menu item
        if ($request->extras) {
            foreach (json_decode($request->extras[0]) as $extra) {
                $menuItem->extras()->attach($extra->id);
            }
        }

        // loop through sizes in request and find the size with the id and attach it to the menu item
        if ($request->sizes) {
            foreach (json_decode($request->sizes[0]) as $size) {
                $menuItem->sizes()->attach($size->id);
            }
        }

        return response()->json([
            "message" => "Menu item created successfully",
            "data" => $menuItem->load('category')->load('extras')->load('sizes')
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, MenuItem $menuItem) {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required',
            'dietary_requirements' => 'nullable|string',
            'image' => 'nullable',
            'menu_category_id' => 'required',
            'extras' => 'nullable|array',
            'sizes' => 'nullable|array'
        ]);

        $menuItem->update([
            'title' => $request->title,
            'description' => $request->description,
            'dietary_requirements' => $request->dietary_requirements,
            'price' => $request->price,
            'image' => $request->hasFile('image') ? ImagePackage::save($request->file('image'), 'menu_items') : null,
            'menu_category_id' => $request->menu_category_id,
            'restaurant_id' => Auth::user()->restaurant_id,
        ]);

        // detach all extras from menu item
        $menuItem->extras()->detach();

        // loop through extras in request and find the extra with the id and attach it to the menu item
        if ($request->extras) {
            foreach (json_decode($request->extras[0]) as $extra) {
                $menuItem->extras()->attach($extra->id);
            }
        }

        // detach all sizes from menu item
        $menuItem->sizes()->detach();

        // loop through sizes in request and find the size with the id and attach it to the menu item
        if ($request->sizes) {
            foreach (json_decode($request->sizes[0]) as $size) {
                $menuItem->sizes()->attach($size->id);
            }
        }

        return response()->json([
            "message" => "Menu item updated successfully",
            "data" => $menuItem->load('category')->load('extras')->load('sizes')
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function destroy(Request $request, MenuItem $menuItem) {
        if ($menuItem == null) {
            return response()->json([
                "message" => "Menu item not found"
            ], 404);
        }

        // detach sizes from menu item
        $menuItem->sizes()->detach();

        // detach extras from menu item
        $menuItem->extras()->detach();

        // delete the image
        ImagePackage::delete($menuItem->image);

        // Delete the menu item
        $menuItem->delete();

        return response()->json([
            "message" => "Menu item deleted successfully"
        ], 204);
    }
}

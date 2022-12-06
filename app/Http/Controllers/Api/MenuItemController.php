<?php

namespace App\Http\Controllers\Api;

use App\Models\MenuItem;
use Illuminate\Http\Request;
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
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'image' => 'required',
            'category_id' => 'required',
            'extras' => 'required',
            'sizes' => 'required'
        ]);

        $menuItem = MenuItem::create([
            'title' => $request->title,
            'description' => $request->description,
            'dietary_requirements' => $request->dietary_requirements,
            'price' => $request->price,
            'image' => $request->image,
            'category_id' => $request->category_id,
            'restaurant_id' => Auth::user()->restaurant_id,
        ]);

        $menuItem->extras()->attach($request->extras);
        $menuItem->sizes()->attach($request->sizes);

        return response()->json([
            "data" => $menuItem
        ], 200);
    }
}
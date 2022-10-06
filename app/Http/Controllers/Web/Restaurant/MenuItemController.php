<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Extra;
use App\Models\MenuItem;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MenuItemController extends Controller
{
 /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Create a model for this
        $item = new MenuItem;
        $search = $request->get('search', '');
        $filter = $request->get('filter', '');
        $perPage = $request->get('perPage', 10);

        // get menu categories for this restaurant
        $menuCategories = MenuCategory::where('restaurant_id', Auth::user()->restaurant_id)->get();

        $items = $item
            ->where('restaurant_id', Auth::user()->restaurant_id)
            ->with('category')
            ->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', '%' . $search . '%');
            })
            ->where('menu_category_id', 'LIKE', '%' . $filter . '%')
            ->latest()
            ->paginate(10 ?? $perPage);


        return Inertia::render('RestaurantAdmin/Products/Index', [
            'items' => $items,
            'menuCategories' => $menuCategories,
            'search' => $search,
            'filter' => $filter,
            'perPage' => $perPage ?? 10,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $menuItem = new MenuItem;
        $categories = MenuCategory::where('restaurant_id', Auth::user()->restaurant_id)->orderBy('title')->get();
        $extras = Extra::where('restaurant_id', Auth::user()->restaurant_id)->get();

        return Inertia::render('RestaurantAdmin/Products/Create', [
            'categories' => $categories,
            'extras' => $extras,
            'menuItem' => $menuItem,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        dd($request->all());
        // validate
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'extras' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'category' => 'required',
            'size' => 'nullable|string',
            'additional_charge' => 'nullable|numeric',
        ]);

        // Redirect and inform the user
        return redirect()->route('restaurant.menu.items.index')->with('success', 'Item created.');
    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(MenuItem $menuItem)
    {

        // get the image from the menu item
        $image = $menuItem->getMedia('items');

        $url =  '';//config('app.url');

        if(!$image->isEmpty()){
            $item->setAttribute('image', $url . $image[0]->getFullUrl());
        }
        else{
            $menuItem->setAttribute('image', null);
        }



        $categories = MenuCategory::where('restaurant_id', $menuItem->restaurant_id)->orderBy('title')->get();
        $categoriesArray = [];

        foreach ($categories as $category) {

            $selected = false;
            if ($menuItem->menu_category_id == $category->id){
                $selected = true;
            }

            array_push($categoriesArray, ["text" => ucfirst($category->title), "value" => $category->id, "selected" =>  $selected]);
        }

        if (count($categoriesArray) > 0) {
            $filter = $item->menu_category_id;
        } else {
            $filter = '';
        }

        // Load the view
        return Inertia::render('RestaurantAdmin/Products/Edit', [
            'menuItem' => $menuItem,
            'categories' => $categoriesArray,
            'filter' => $filter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MenuItem $menuItem)
    {
        // Validate the data
        $request->validate([
            'title' => ['required', 'string', 'max:191'],
            'price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
        ]);

        // Update the parameters
        $menuItem->title = Str::lower($request->title);
        $menuItem->price = $request->price;
        $menuItem->menu_category_id = $request->filter;
        $menuItem->restaurant_id = 1;

        if(!is_null($request->description)) {
            $menuItem->description = $request->description;
        }

        if(!is_null($request->dietary_requirements)) {
            $menuItem->dietary_requirements = $request->dietary_requirements;
        }
        // Save to the database
        $menuItem->save();

        if (!is_null($request->image)) {
            $menuItem->addMediaFromRequest('image')->toMediaCollection('items');
        }


        // Redirect and inform the user
        return redirect()->route('restaurant.menu.items.index')->with('success', 'Item updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(MenuItem $menuItem)
    {
        // Delete the menu item
        $menuItem->delete();

        return redirect()->route('restaurant.menu.items.index')->with('success', 'Item deleted.');
    }
}
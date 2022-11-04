<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\Size;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Extra;
use App\Models\MenuItem;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Packages\ImagePackage;
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
            ->when($filter, function ($q) use ($filter) {
                $q->where('menu_category_id', $filter);
            })
            ->latest()
            ->paginate($perPage ?? 10);



        return Inertia::render('RestaurantAdmin/Products/Index', [
            'items' => $items,
            'menuCategories' => $menuCategories,
            'search' => $search,
            'filter' => $filter ?? null,
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
        // dd($request->all());


        // validate
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'extras' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'menu_category_id' => 'required|integer',
            'sizes' => 'nullable|array',
            'additional_charge' => 'nullable|numeric',
        ]);
        $menuItem = new MenuItem;
        // create new menu item
        $menuItem->title = $request->title;
        $menuItem->description = $request->description;
        $menuItem->price = $request->price;
        $menuItem->menu_category_id = $request->menu_category_id;
        $menuItem->dietary_requirements = $request->dietary_requirements;
        $menuItem->restaurant_id = Auth::user()->restaurant_id;
        $menuItem->image = ImagePackage::save($request->image, 'menu_items');
        $menuItem->save();
        $sizes = $request->get('sizes', []);

        foreach ($sizes as $size) {
            $newSize = Size::create([
                'name' => $size['size'],
                'additional_charge' => $size['additional_charge'],
                'restaurant_id' => Auth::user()->restaurant_id,
            ]);

            $menuItem->sizes()->attach($newSize);

        }
        $extras = $request->get('extras', []);

        foreach ($extras as $extra) {
            $existingExtra = Extra::find($extra['id']);

            $menuItem->extras()->attach($existingExtra);

        }


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
        // get menu categories for this restaurant
        $categories = MenuCategory::where('restaurant_id', Auth::user()->restaurant_id)->orderBy('title')->get();

        // get extras for this menu item
        $existingExtras = $menuItem->extras()->get();

        // get sizes for this menu item
        $existingSizes = $menuItem->sizes()->get();

        $menuItem->sizes = $existingSizes;
        $menuItem->extras = $existingExtras;

        // Load the view
        return Inertia::render('RestaurantAdmin/Products/Edit', [
            'menuItem' => $menuItem,
            'categories' => $categories,
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
        // validate
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'menu_category_id' => 'required|integer',
            'sizes' => 'nullable|array',
            'additional_charge' => 'nullable|numeric',
        ]);


        // update menu item
        $menuItem->title = is_null($request->title) ? $menuItem->title : $request->title;
        $menuItem->description = is_null($request->description) ? $menuItem->description : $request->description;
        $menuItem->price = is_null($request->price) ? $menuItem->price : $request->price;
        $menuItem->menu_category_id = is_null($request->menu_category_id) ? $menuItem->menu_category_id : $request->menu_category_id;
        $menuItem->dietary_requirements = is_null($request->dietary_requirements) ? $menuItem->dietary_requirements : $request->dietary_requirements;
        $menuItem->image = is_null($request->image) ? $menuItem->image : ImagePackage::save($request->image, 'menu_items');
        $menuItem->save();

        // detach all extras
        $menuItem->extras()->detach();

        // attach new extras
        $extras = $request->get('extras', []);

        foreach ($extras as $extra) {
            $existingExtra = Extra::find($extra['id']);

            $menuItem->extras()->attach($existingExtra);
        }

        // detach all sizes
        $menuItem->sizes()->detach();

        // attach new sizes
        $sizes = $request->get('sizes', []);

        foreach ($sizes as $size) {
            $newSize = Size::create([
                'name' => $size['name'],
                'additional_charge' => $size['additional_charge'],
                'restaurant_id' => Auth::user()->restaurant_id,
            ]);

            $menuItem->sizes()->attach($newSize);
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
    public function destroy($id)
    {
        // get the menu item
        $menuItem = MenuItem::find($id);
        // Delete the menu item
        $menuItem->delete();

        return redirect()->route('restaurant.menu.items.index')->with('success', 'Item deleted.');
    }
}
<?php

namespace App\Http\Controllers\Admin\Restaurant;

use App\Models\User;
use Inertia\Inertia;
use App\Models\MenuItem;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Models\RestaurantCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MenuCategoriesController extends Controller
{
 /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Create a model for this
        $category = new MenuCategory;
        // Apply the search to the model
        $search = $request->get('search', '');
        $categories = $category
                    ->where('restaurant_id', Auth::user()->restaurant_id)
                      ->where(function ($q) use ($search) {
                          $q->where('title', 'LIKE', '%' . $search . '%');
                      })
                      ->latest()
                      ->paginate(10);

        return Inertia::render('RestaurantAdmin/Categories/Index', [
            'categories' => $categories,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $category = new MenuCategory;
        return Inertia::render('RestaurantAdmin/Categories/Create', [
            'category' => $category,
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
        // Validate the data
        $this->validate($request, [
            'title' => 'required|string|max:255',
        ]);

        // Create a new model
        $category = MenuCategory::create([
            'title' => $request->title,
            'restaurant_id' => Auth::user()->restaurant_id,
        ]);


        // Redirect to the index page
        return redirect()->route('restaurant.menu.categories.index')->with('success', 'The category has been created');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, MenuCategory $category)
    {
        // Load the view
        return Inertia::render('RestaurantAdmin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MenuCategory $category)
    {
        // Validate the data
        $request->validate([
            'title' => ['required', 'string', 'max:191'],

        ]);

        // Update the parameters
        $category->title = Str::lower($request->title);

        if(!is_null($request->description)) {
            $category->description = $request->description;
        }

        if(!is_null($request->notes)) {
            $category->notes = $request->notes;
        }

        // Save to the database
        $category->save();

        // Redirect and inform the user
        return redirect()->route('restaurant.menu.categories.index')->with('success', 'Category updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(MenuCategory $category)
    {
        // Delete the category
        $category->delete();

        // Redirect and inform the user
        return redirect()->route('restaurant.menu.categories.index')->with('success', 'Category deleted.');
    }
}
<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\User;
use Inertia\Inertia;
use App\Models\MenuItem;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Models\RestaurantCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MenuCategoryController extends Controller
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
        $perPage = $request->get('perPage', '');
        $categories = $category
                    ->where('restaurant_id', Auth::user()->restaurant_id)
                      ->where(function ($q) use ($search) {
                          $q->where('title', 'LIKE', '%' . $search . '%');
                      })
                      ->latest()
                      ->paginate($perPage ?? 10);

        return Inertia::render('RestaurantAdmin/Categories/Index', [
            'categories' => $categories,
            'search' => $search,
            'perPage' => $perPage,
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
        $request->validate([
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
    public function edit($id)
    {
        // Get the category
        $category = MenuCategory::findOrFail($id);
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
    public function update(Request $request, $id)
    {
        // Validate the data
        $request->validate([
            'title' => ['required', 'string', 'max:191'],
        ]);

        // Get the category
        $category = MenuCategory::findOrFail($id);
        // Update the category
        $category->update([
            'title' => $request->title,
        ]);


        // Redirect and inform the user
        return redirect()->route('restaurant.menu.categories.index')->with('success', 'Category updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // get the category
        $category = MenuCategory::findOrFail($id);
        // Delete the category
        $category->delete();

        // Redirect and inform the user
        return redirect()->route('restaurant.menu.categories.index')->with('success', 'Category deleted.');
    }
}
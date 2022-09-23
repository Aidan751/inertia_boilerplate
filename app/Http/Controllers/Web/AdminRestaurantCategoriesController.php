<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\RestaurantCategory;

class AdminRestaurantCategoriesController extends Controller
{
    public function index(Request $request)
    {
           // Create a model for this
           $category = new RestaurantCategory;

           // Apply the search to the model
           $search = $request->get('search', '');
           $categories = $category
                         ->where(function ($q) use ($search) {
                             $q->where('name', 'LIKE', '%' . $search . '%');
                         })
                         ->orderBy('name', 'asc')
                         ->paginate(10);

           return Inertia::render('MainAdmin/RestaurantCategories/Index', [
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
        $category = new RestaurantCategory;
        return Inertia::render('MainAdmin/RestaurantCategories/Create', [
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
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = new RestaurantCategory;
        $category->name = $request->name;
        $category->save();

        return redirect()->route('admin.restaurant-categories.index')->with('success', 'Category created successfully.');
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RestaurantCategory  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(RestaurantCategory $category)
    {
        return Inertia::render('MainAdmin/RestaurantCategories/Edit', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RestaurantCategory  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RestaurantCategory $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->name = $request->name;
        $category->save();

        return redirect()->route('admin.restaurant-categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RestaurantCategory  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(RestaurantCategory $category)
    {
        $category->delete();

        return redirect()->route('admin.restaurant-categories.index')->with('success', 'Category deleted successfully.');
    }

}
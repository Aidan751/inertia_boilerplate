<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
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
        $categories = $category
                    ->where('restaurant_id', $user->restaurant->id)
                      ->where(function ($q) use ($search) {
                          $q->where('title', 'LIKE', '%' . $search . '%');
                      })
                      ->latest()
                      ->paginate(10);

        return view('restaurant.menucategories.index', compact('categories', 'search', 'user'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $category = new MenuCategory;
        return view('restaurant.menucategories.create', compact('category'));
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
            'restaurant_id' => Auth::user()->restaurant->id,
        ]);


        // Redirect to the index page
        return redirect()->route('restaurant-menucategories.index')->with('success', 'The category has been created');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {


        return redirect()->route('restaurant-menucategories.edit', $id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Find the model for this ID
        $category = MenuCategory::where('id', $id)->where('restaurant_id', 1)->first();

        // Load the view
        return view('restaurant.menucategories.edit', compact('category'));
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

        // Find the model for this ID
        $category = MenuCategory::where('id', $id)->where('restaurant_id', 1)->first();

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
        return redirect()->route('restaurant-menucategories.index')->with('success', 'Category updated.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Find the model for this ID

        $match = MenuItem::where('restaurant_id', 1)->where('menu_category_id', $id)->first();

        if ($match === null) {
            // No item is using this category
            MenuCategory::destroy($id);
            return redirect()->route('restaurant-menucategories.index')->with('success', 'Category deleted.');
         } else {
            return redirect()->route('restaurant-menucategories.index')->with('error', "Menu items are currently assigned to this category, therefore it cannot be deleted.");
         }
    }
}
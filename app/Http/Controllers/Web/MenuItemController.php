<?php

namespace App\Http\Controllers\Web;

use App\Models\User;
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
        $categoriesArray = [];

        $categories = MenuCategory::where('restaurant_id', Auth::user()->restaurant_id)->orderBy('title')->get();

            array_push($categoriesArray, ["placeholder" => true, "text" => "Select a category"]);

            if ($filter == '' || $filter == 0) {
                array_push($categoriesArray, ["text" => "All", "value" => 0, "selected" => true]);
            } else {
                array_push($categoriesArray, ["text" => "All", "value" => 0, "selected" => false]);
            }

            foreach ($categories as $category) {

                $selected = false;

                if ($filter == $category->id) {
                    $selected = true;
                }

                array_push($categoriesArray, ["text" => ucfirst($category->title), "value" => $category->id, "selected" =>  $selected]);

            }



        // // Apply the search to the model
        // $search = $request->get('search', '');
        $items = $item
                    ->where('restaurant_id', Auth::user()->restaurant_id)
                    ->when('filter', function($q) use ($filter) {
                        if ($filter != null && $filter != "" && $filter != 0) {
                            $q->where('menu_category_id', $filter);
                        }
                    })
                      ->where(function ($q) use ($search) {
                          $q->where('title', 'LIKE', '%' . $search . '%');
                      })
                      ->latest()
                      ->paginate(10);

        return view('restaurant.menuitems.index', compact('items', 'search', 'filter', 'categoriesArray'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $item = new MenuItem;
        $categories = MenuCategory::where('restaurant_id', 1)->orderBy('title')->get();
        $categoriesArray = [];



        foreach ($categories as $category) {
            array_push($categoriesArray, ["text" => ucfirst($category->title), "value" => $category->id, "selected" =>  false]);
        }

        if (count($categoriesArray) > 0) {
            $filter = $categoriesArray[0]['value'];
        } else {
            $filter = '';
        }

        return view('restaurant.menuitems.create', compact('item', 'categoriesArray', 'filter'));
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
            'title' => ['required', 'string', 'max:191'],
            'price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],

        ]);

        // Create a model for this User
        $item = new MenuItem;

        $item->restaurant_id = 1;
        $item->title = Str::lower($request->title);
        $item->price = $request->price;
        $item->menu_category_id = $request->filter;

        if(!is_null($request->description)) {
            $item->description = $request->description;
        }

        if(!is_null($request->dietary_requirements)) {
            $item->dietary_requirements = $request->dietary_requirements;
        }

        // Save to the database
        $item->save();

        if (!is_null($request->image)) {
            $item->addMediaFromRequest('image')->toMediaCollection('items');
        }

        // Redirect and inform the user
        return redirect()->route('restaurant-menuitems.index')->with('success', 'Item created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return redirect()->route('restaurant-menuitems.edit', $id);
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
        $item = MenuItem::where('id', $id)->where('restaurant_id', 1)->first();
        $image = $item->getMedia('items');

        $url =  '';//config('app.url');

        if(!$image->isEmpty()){
            $item->setAttribute('image', $url . $image[0]->getFullUrl());
        }
        else{
            $item->setAttribute('image', null);
        }



        $categories = MenuCategory::where('restaurant_id', 1)->orderBy('title')->get();
        $categoriesArray = [];

        foreach ($categories as $category) {

            $selected = false;
            if ($item->menu_category_id == $category->id){
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
        return view('restaurant.menuitems.edit', compact('item', 'categoriesArray', 'filter'));
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
            'price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
        ]);

        // Find the model for this ID
        $item = MenuItem::where('id', $id)->where('restaurant_id', 1)->first();

        // Update the parameters
        $item->title = Str::lower($request->title);
        $item->price = $request->price;
        $item->menu_category_id = $request->filter;
        $item->restaurant_id = 1;

        if(!is_null($request->description)) {
            $item->description = $request->description;
        }

        if(!is_null($request->dietary_requirements)) {
            $item->dietary_requirements = $request->dietary_requirements;
        }
        // Save to the database
        $item->save();

        if (!is_null($request->image)) {
            $item->addMediaFromRequest('image')->toMediaCollection('items');
        }


        // Redirect and inform the user
        return redirect()->route('restaurant-menuitems.index')->with('success', 'Item updated.');
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
        $item = MenuItem::find($id);

        // Delete the user
        $item->delete();

        return redirect()->route('restaurant-menuitems.index')->with('success', 'Item deleted.');
    }
}
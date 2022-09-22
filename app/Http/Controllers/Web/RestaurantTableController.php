<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\TableNumber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RestaurantTableController extends Controller
{
     /**
     * Handle the incoming request to get all the tables.
     * The method will return all the tables in the database.
     * The method will return an inertia view with the tables.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {
         $search = $request->search ?? null;

         // Get all tables, paginate through them using the "perPage" parameter. Search through the tables, if the "search" parameter is present.
        if($request->search !== null){

            $tables = TableNumber::where(function ($q) use ($search) {
               // Add your own filter values here
               //$q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
        }
        else {

            $tables = TableNumber::paginate($request->perPage ?? 10);
        }


        // Return an inertia view with the tables
        return Inertia::render('indexView', [
            'tables' => $tables,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

       /**
     * Handle the incoming request to create a user.
     * The method will check if the user has the permission to create a permission.
     * The method will return an inertia view with the table.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(){
        return Inertia::render('createView');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        TableNumber::create(
           // Add your own validation here
            //Request::validate([
                //'title' => ['required', 'max:90'],
                //'description' => ['required'],
            //])
        );

        return redirect()->route('tables.index')->with('success', 'Table created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TableNumber  $table
     * @return \Illuminate\Http\Response
     */
    public function show(TableNumber $table)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models$TableNumber  $table
     * @return \Illuminate\Http\Response
     */
    public function edit(TableNumber $table)
    {
        return Inertia::render('editView', [
            'table' => [

            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models$TableNumber  $table
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TableNumber $table)
    {

        // Validate the request
        //data = Request::validate([
                //'title' => ['required', 'max:90'],
                //'description' => ['required'],
            //]);
        $table->update(data);


        return redirect()->route('tables.index')->with('success', 'Table updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TableNumber  $table
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableNumber $table)
    {
        $table->delete();

        return redirect()->route('tables.index')->with('success', 'Table deleted successfully');
    }
}
<?php



namespace App\Http\Controllers\Web\Restaurant;


use App\Models\User;
use Inertia\Inertia;
use App\Models\TableNumber;
use Illuminate\Support\Str;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;




class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //get all the table numbers belonging to the restaurant
        $tableNumbers = TableNumber::where('restaurant_id', Auth::user()->restaurant_id)->get();

        // return the view with the list of table numbers
        return Inertia::render('RestaurantAdmin/TableService/Index', [
            'tableNumbers' => $tableNumbers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request)
    {
        // instantiate a new table number
        $tableNumber = new TableNumber();

        // return the view with the table number
        return Inertia::render('RestaurantAdmin/TableService/Create', [
            'tableNumber' => $tableNumber,
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
        // validate the request
        $request->validate([
            'table_number' => 'required',
        ]);

        // create the table number
        $tableNumber = TableNumber::create([
            'restaurant_id' => Auth::user()->restaurant_id,
            'table_number' => $request->table_number,
            'table_reference' => $request->table_reference,
        ]);

        // redirect to the table number index page
        return redirect()->route('restaurant.tables.index')->with('success', 'Table Number created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request, TableNumber $tableNumber)
    {
        // return the view with the table number
        return Inertia::render('RestaurantAdmin/TableService/Edit', [
            'tableNumber' => $tableNumber,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, TableNumber $tableNumber)
    {
        // validate the request
        $request->validate([
            'table_number' => 'required',
        ]);

        // update the table number
        $tableNumber->update([
            'table_number' => $request->table_number,
            'table_reference' => $request->table_reference,
        ]);

        // redirect to the table number index page
        return redirect()->route('restaurant.tables.index')->with('success', 'Table Number updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy(TableNumber $tableNumber)
    {
        // delete the table number
        $tableNumber->delete();

        // redirect to the table number index page
        return redirect()->route('restaurant.tables.index')->with('success', 'Table Number deleted successfully');
    }
}
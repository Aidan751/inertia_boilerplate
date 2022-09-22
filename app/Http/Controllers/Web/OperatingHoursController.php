<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\OperatingHour;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OperatingHoursController extends Controller
{
     /**
     * Handle the incoming request to get all the operatingHours.
     * The method will return all the tables in the database.
     * The method will return an inertia view with the operatingHours.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {
         $search = $request->search ?? null;

         // Get all operatingHours, paginate through them using the "perPage" parameter. Search through the operatingHours, if the "search" parameter is present.
        if($search !== null){

            $operatingHours = OpeningHour::where(function ($q) use ($search) {
               // Add your own filter values here
               //$q->where('first_name', 'LIKE', '%' . $search . '%')->orWhere('last_name', 'LIKE', '%' . $search . '%')->orWhere('email', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);
        }
        else {

            $operatingHours = OpeningHour::paginate($request->perPage ?? 10);
        }


        // Return an inertia view with the operatingHours
        return Inertia::render('indexView', [
            'operatingHours' => $operatingHours,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

       /**
     * Handle the incoming request to create a operatingHour.
     * The method will return an inertia view with the operatingHour.
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
        // validate the request

        // create the operatingHour

        return redirect()->route('operatingHours.index')->with('success', 'OpeningHour created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OperatingHour  $operatingHour
     * @return \Illuminate\Http\Response
     */
    public function show(OpeningHour $operatingHour)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OperatingHour  $operatingHour
     * @return \Illuminate\Http\Response
     */
    public function edit(OpeningHour $operatingHour)
    {
        return Inertia::render('editView', [
            'operatingHour' => [

            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OperatingHour  $operatingHour
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OpeningHour $operatingHour)
    {

        // Validate the request
        //$data = Request::validate([
                //'title' => ['required', 'max:90'],
                //'description' => ['required'],
            //]);
        $operatingHour->update(data);


        return redirect()->route('operatingHours.index')->with('success', 'OpeningHour updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OperatingHour  $operatingHour
     * @return \Illuminate\Http\Response
     */
    public function destroy(OpeningHour $operatingHour)
    {
        $operatingHour->delete();

        return redirect()->route('operatingHours.index')->with('success', 'OpeningHour deleted successfully');
    }
}
<?php

namespace App\Http\Controllers\Web\Restaurant;

use Inertia\Inertia;
use App\Models\Offer;
use Illuminate\Http\Request;
use App\Packages\ImagePackage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
     /**
     * Handle the incoming request to get all the offers.
     * The method will return all the tables in the database.
     * The method will return an inertia view with the offers.
     * @param \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */

    public function index(Request $request)
    {
         // Create a model for this
         $offer = new Offer;

        $search = $request->get('search', '');
        $perPage = $request->get('perPage', '');

         // Get all offers, paginate through them using the "perPage" parameter. Search through the offers, if the "search" parameter is present.
            $offers = $offer
            ->where('restaurant_id', auth()->user()->restaurant_id)
            ->where(function ($q) use ($search) {
               $q->where('title', 'LIKE', '%' . $search . '%');
            })
            ->latest()
            ->paginate(10);




        // Return an inertia view with the offers
        return Inertia::render('RestaurantAdmin/OffersAndNews/Index', [
            'offers' => $offers,
            "perPage" => $request->perPage ?? 10,
            "search" => $request->search ?? null
        ]);
    }

       /**
     * Handle the incoming request to create a offer.
     * The method will return an inertia view with the offer.
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(){
        return Inertia::render('RestaurantAdmin/OffersAndNews/Create');
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
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image',
        ]);
        // create the offer
        $offer = Offer::create([
            'restaurant_id' => Auth::user()->restaurant_id,
            'title' => $request->title,
            'description' => $request->description,
            'image' => ImagePackage::save($request->image, 'offers'),
        ]);

        return redirect()->route('restaurant.offers.index')->with('success', 'Offer created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models$Offer  $offer
     * @return \Illuminate\Http\Response
     */
    public function show(Offer $offer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Offer $offer)
    {
        return Inertia::render('RestaurantAdmin/OffersAndNews/Edit', [
            'offer' => $offer
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Offer $offer)
    {
        // validate the request
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // update the offer
        $offer->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => is_null($request->image) ? $offer->image : ImagePackage::save($request->image, 'offers'),
        ]);

        return redirect()->route('restaurant.offers.index')->with('success', 'Offer updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Offer $offer)
    {
        $offer->delete();

        return redirect()->route('restaurant.offers.index')->with('success', 'Offer deleted successfully');
    }
}
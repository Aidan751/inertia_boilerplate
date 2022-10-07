<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\OpeningHour;
use Illuminate\Http\Request;
use App\Models\CollectionTime;
use Illuminate\Support\Facades\Auth;

class OpeningHourController extends Controller
{
    public function edit()
    {
        // get the opening times for the restaurant
        $opening_hours = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->get();
        // get the collection times for the restaurant
        $collection_times = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->get();
        return Inertia::render('Restaurant/OpeningTimes/Edit', [
            'opening_hours' => $opening_hours,
            'collection_times' => $collection_times,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'opening_from' => 'required|date_format:H:i',
            'opening_to' => 'required|date_format:H:i',
            'collection_from' => 'required|date_format:H:i',
            'collection_to' => 'required|date_format:H:i',
        ]);

        $openingHour->update([
            'from' => $request->opening_from,
            'to' => $request->opening_to,
        ]);

        $collectionTime->update([
            'from' => $request->collection_from,
            'to' => $request->collection_to,
        ]);

        return redirect()->route('restaurant.opening-hours.edit')->with('success', 'Opening times updated successfully');
    }
}
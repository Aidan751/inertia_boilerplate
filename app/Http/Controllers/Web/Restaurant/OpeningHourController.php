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
        $opening_hours_monday = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 4)->get();
        $opening_hours_tuesday = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 6)->get();
        $opening_hours_wednesday = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 1)->get();
        $opening_hours_thursday = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 5)->get();
        $opening_hours_friday = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 3)->get();
        $opening_hours_saturday = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 7)->get();
        $opening_hours_sunday = OpeningHour::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 2)->get();

        // get the collection times for the restaurant
        $collection_times_monday = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 4)->get();
        $collection_times_tuesday = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 6)->get();
        $collection_times_wednesday = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 1)->get();
        $collection_times_thursday = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 5)->get();
        $collection_times_friday = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 3)->get();
        $collection_times_saturday = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 7)->get();
        $collection_times_sunday = CollectionTime::where('restaurant_id', Auth::user()->restaurant->id)->where('day_id', 2)->get();

        return Inertia::render('Restaurant/OpeningTimes/Edit', [
            'opening_hours_monday' => $opening_hours_monday,
            'opening_hours_tuesday' => $opening_hours_tuesday,
            'opening_hours_wednesday' => $opening_hours_wednesday,
            'opening_hours_thursday' => $opening_hours_thursday,
            'opening_hours_friday' => $opening_hours_friday,
            'opening_hours_saturday' => $opening_hours_saturday,
            'opening_hours_sunday' => $opening_hours_sunday,
            'collection_times_monday' => $collection_times_monday,
            'collection_times_tuesday' => $collection_times_tuesday,
            'collection_times_wednesday' => $collection_times_wednesday,
            'collection_times_thursday' => $collection_times_thursday,
            'collection_times_friday' => $collection_times_friday,
            'collection_times_saturday' => $collection_times_saturday,
            'collection_times_sunday' => $collection_times_sunday,
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
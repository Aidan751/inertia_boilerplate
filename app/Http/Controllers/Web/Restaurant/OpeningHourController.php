<?php

namespace App\Http\Controllers\Web\Restaurant;

use App\Models\Day;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Restaurant;
use App\Models\OpeningHour;
use Illuminate\Http\Request;
use App\Models\CollectionTime;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OpeningHourController extends Controller
{
    public function edit(Request $request, $id)
    {
        $user = User::find($id);
        $restaurant_id = $user->restaurant_id;
        // get days of the week
        $monday = Day::where('day_of_the_week', 'Monday')->first();
        $tuesday = Day::where('day_of_the_week', 'Tuesday')->first();
        $wednesday = Day::where('day_of_the_week', 'Wednesday')->first();
        $thursday = Day::where('day_of_the_week', 'Thursday')->first();
        $friday = Day::where('day_of_the_week', 'Friday')->first();
        $saturday = Day::where('day_of_the_week', 'Saturday')->first();
        $sunday = Day::where('day_of_the_week', 'Sunday')->first();

        // check if opening hours exist, if they do then get them
        if (OpeningHour::where('restaurant_id', $restaurant_id)->exists()){
        if(OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $monday->id)->exists()) {
            $opening_hours_monday = OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $monday->id)->get();
        } else {
            $opening_hours_monday = [];
        }

        if(OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $tuesday->id)->exists()) {
            $opening_hours_tuesday = OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $tuesday->id)->get();
        } else {
            $opening_hours_tuesday = [];
        }

        if(OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $wednesday->id)->exists()) {
            $opening_hours_wednesday = OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $wednesday->id)->get();
        } else {
            $opening_hours_wednesday = [];
        }

        if(OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $thursday->id)->exists()) {
            $opening_hours_thursday = OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $thursday->id)->get();
        } else {
            $opening_hours_thursday = [];
        }

        if(OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $friday->id)->exists()) {
            $opening_hours_friday = OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $friday->id)->get();
        } else {
            $opening_hours_friday = [];
        }

        if(OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $saturday->id)->exists()) {
            $opening_hours_saturday = OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $saturday->id)->get();
        } else {
            $opening_hours_saturday = [];
        }

        if(OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $sunday->id)->exists()) {
            $opening_hours_sunday = OpeningHour::where('restaurant_id', $restaurant_id)->where('day_id', $sunday->id)->get();
        } else {
            $opening_hours_sunday = [];
        }
    }

    // check if collection times exist, if they do then get them
    if (CollectionTime::where('restaurant_id', $restaurant_id)->exists()){
        if(CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $monday->id)->exists()) {
            $collection_times_monday = CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $monday->id)->get();
        } else {
            $collection_times_monday = "";
        }

        if(CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $tuesday->id)->exists()) {
            $collection_times_tuesday = CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $tuesday->id)->get();
        } else {
            $collection_times_tuesday = "";
        }

        if(CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $wednesday->id)->exists()) {
            $collection_times_wednesday = CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $wednesday->id)->get();
        } else {
            $collection_times_wednesday = "";
        }

        if(CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $thursday->id)->exists()) {
            $collection_times_thursday = CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $thursday->id)->get();
        } else {
            $collection_times_thursday = "";
        }

        if(CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $friday->id)->exists()) {
            $collection_times_friday = CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $friday->id)->get();
        } else {
            $collection_times_friday = "";
        }

        if(CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $saturday->id)->exists()) {
            $collection_times_saturday = CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $saturday->id)->get();
        } else {
            $collection_times_saturday = "";
        }

        if(CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $sunday->id)->exists()) {
            $collection_times_sunday = CollectionTime::where('restaurant_id', $restaurant_id)->where('day_id', $sunday->id)->get();
        } else {
            $collection_times_sunday = "";
        }

    }


        return Inertia::render('RestaurantAdmin/OpeningTimes/Edit', [
            'opening_hours_monday' => $opening_hours_monday ?? "",
            'opening_hours_tuesday' => $opening_hours_tuesday ?? "",
            'opening_hours_wednesday' => $opening_hours_wednesday ?? "",
            'opening_hours_thursday' => $opening_hours_thursday ?? "",
            'opening_hours_friday' => $opening_hours_friday ?? "",
            'opening_hours_saturday' => $opening_hours_saturday ?? "",
            'opening_hours_sunday' => $opening_hours_sunday ?? "",
            'collection_times_monday' => $collection_times_monday ?? "",
            'collection_times_tuesday' => $collection_times_tuesday ?? "",
            'collection_times_wednesday' => $collection_times_wednesday ?? "",
            'collection_times_thursday' => $collection_times_thursday ?? "",
            'collection_times_friday' => $collection_times_friday ?? "",
            'collection_times_saturday' => $collection_times_saturday ?? "",
            'collection_times_sunday' => $collection_times_sunday ?? "",
        ]);
    }

    public function update(Request $request)
    {
        $restaurant = Restaurant::where('id', Auth::user()->restaurant_id)->first();
        $openHours = OpeningHour::where('restaurant_id', $restaurant->id)->get();
        $collectionTimes = CollectionTime::where('restaurant_id', $restaurant->id)->get();

        foreach($openHours as $openHour) {
            $openHour->delete();
        }

        foreach($collectionTimes as $collectionTime) {
            $collectionTime->delete();
        }

        foreach($request->openHours as $key => $openHoursForDay) {

            foreach($openHoursForDay as $times){

                foreach($times as $time) {

                    $openHour = OpeningHour::create([
                        'restaurant_id' => $restaurant->id,
                        'day_id' => $key + 1,
                        'from' => $time['from'],
                        'to' => $time['to'],
                    ]);
                }
            }
        }

        foreach($request->collectionTimes as $key => $collectionTimesForDay) {

            foreach($collectionTimesForDay as $times){

                foreach($times as $time) {

                    $collectionTime = CollectionTime::create([
                        'restaurant_id' => $restaurant->id,
                        'day_id' => $key + 1,
                        'from' => $time['from'],
                        'to' => $time['to'],
                    ]);
                }
            }
        }

        return redirect()->back()->with('success', 'Opening times and Collection times updated successfully');
    }
}
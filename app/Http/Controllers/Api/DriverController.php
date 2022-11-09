<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserDriver;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;

use App\Models\User;
use App\Models\UserLocation;

class DriverController extends Controller
{

    public function create(Request $request)
    {
        $validator =
            Validator::make(
                $request->all(),
                [
                    'first_name' => 'required',
                    'last_name' => 'required',
                    'email' => 'required|email|unique:users',
                    'role_id' => 'required',
                    'password' => 'required',
                ]
            );

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        // Create the User table entry

        $user = new User;
        $user->role_id = $request->role_id;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->contact_number = $request->contact_number;
        $user->password = bcrypt($request->password);

        $user->save();

        // Create the token for all future requests to the API for this user
        $accessToken = $user->createToken('authToken')->accessToken;

        // Create the Driver table entry

        $driver = new UserDriver;
        $driver->user_id = $user->id;
        $driver->availability_status = "unavailable";
       

        $driver->save();

    
        return response()->json([
            "status" => "Success",
            "message" => "User successfully created!",
            "user" => $user,
            "driver" => $driver,
           
            "access_token" => $accessToken,
        ], 200);
    }

    public function get()
    {
        // Attempt to find the driver
        $driver = UserDriver::with('user')
            ->where('user_id', auth('api')->user()->id)
            ->first();

        if ($driver === null) {
            return response()->json([
                "message" => "Driver not found"
            ], 401);
        } else {
            return response($driver, 200);
        }
    }


    public function update(Request $request)
    {
        // Attempt to find the trip
        $driver = UserDriver::with('user')
            ->where('user_id', auth('api')->user()->id)
            ->first();

        
        if (!is_null($request->stripe_id)) {
            $driver->stripe_id = $request->stripe_id;     
        } 

        if (!is_null($request->available)) {
            $driver->availability_status = $request->available;     
        } 

       
        try {
            $driver->push();
        } catch (QueryException $ex) {
            $errorCode = $ex->errorInfo[1];
            if ($errorCode == 1062) {
                return response()->json([
                    'message' => $ex->errorInfo[2],
                ], 400);
            } else {
                return response()->json([
                    'message' => $ex,
                ], 422);
            }
        }
        return response()->json([
            "message" => "Driver successfully updated!"
        ], 201);
    }


    // Returns the 10 nearest available drivers to a given location

    public function nearest(Request $request) {

        $radius = 1000; // Radius in miles
        $latitude = $request->latitude;
        $longitude = $request->longitude;

        $drivers = UserLocation::
        with('user.driver')
        ->whereHas('user.driver', function($q) {
            $q->where('id', '!=', null)
            ->where('application_status', 'approved')
            ->where('availability_status', 'available');
        })
        ->isWithinMaxDistance($latitude, $longitude, $radius)
        ->orderBy('distance')
        ->skip(0)
        ->take(10)
        ->get();

        return response($drivers, 200);
    }



}

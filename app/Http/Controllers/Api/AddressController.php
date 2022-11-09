<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserAddress;
use Illuminate\Database\QueryException;

class AddressController extends Controller
{
    public function list(Request $request) {

        $query = UserAddress::where('user_id',  auth('api')->user()->id)->get();
            
        return response($query, 200);
    }

    public function add(Request $request) {
        $address = new UserAddress;
       
        $address->user_id = auth('api')->user()->id;
        $address->address_line_1 = $request->address_line_1;
        if (!is_null($request->address_line_2)){
            $address->address_line_2 = $request->address_line_2;
        }
        $address->town = $request->town;
        $address->county = $request->county;
        $address->postcode = $request->postcode;
        $address->latitude = $request->latitude;
        $address->longitude = $request->longitude;
       
        try {
            $address->save();
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
        return response($address, 200);
    }

    public function delete($id) {

          // Find the model for this ID
          $address = UserAddress::find($id);

          try {
            $address->delete();
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
            "message" => "Address deleted!"
        ], 200);
    }
}

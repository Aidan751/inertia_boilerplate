<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class ReviewController extends Controller
{
    public function create(Request $request) {
       
        $review = new Review;
        $review->reviewer_id = auth('api')->user()->id;
        $review->driver_id = $request->driver_id;
        $review->rating = $request->rating;
        $review->order_id = $request->order_id;
        

        try {
            $review->save();
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
            "message" => "Review successfully added!"
        ], 200);
 
    }
}

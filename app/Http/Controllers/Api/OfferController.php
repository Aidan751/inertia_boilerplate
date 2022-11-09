<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    public function get($id)
    {
        // Attempt to find the document
        $offer = Offer::with('media')->where('id', $id)->firstOrFail();

        $logo = $offer->getMedia('offers');

        $url =  '';//config('app.url');
      

        if(!$logo->isEmpty()){
            $offer->setAttribute('logo', $url . $logo[0]->getFullUrl());
        }
        else{
            $offer->setAttribute('logo', null);
        }

        
        if ($offer === null) {
            return response()->json([
                "message" => "Offer does not exist"
            ], 401);
        } else {
            return response($offer, 200);
        }
    }
    
}

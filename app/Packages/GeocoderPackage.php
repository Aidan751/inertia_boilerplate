<?php

namespace App\Packages;

use Illuminate\Support\Facades\Http;

class GeocoderPackage
{
    public static function getDistance($addressFrom, $addressTo, $unit = ''){
        // Google API key
        $apiKey = config('geocoder.key');

        // Change address format
        $formattedAddrFrom    = str_replace(' ', '+', $addressFrom);
        $formattedAddrTo     = str_replace(' ', '+', $addressTo);

        // Geocoding API request with start address
        $geocodeFrom = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$formattedAddrFrom.'&sensor=false&key='.$apiKey);
        $outputFrom = json_decode($geocodeFrom);

        if($outputFrom->status != 'OK'){
            return 'Zero results';
        }

        // Geocoding API request with end address
        $geocodeTo = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$formattedAddrTo.'&sensor=false&key='.$apiKey);
        $outputTo = json_decode($geocodeTo);
        if($outputTo->status != 'OK'){
            return 'Zero results';
        }


        // Get latitude and longitude from the geodata
        $latitudeFrom    = $outputFrom->results[0]->geometry->location->lat;
        $longitudeFrom    = $outputFrom->results[0]->geometry->location->lng;
        $latitudeTo        = $outputTo->results[0]->geometry->location->lat;
        $longitudeTo    = $outputTo->results[0]->geometry->location->lng;

        // Calculate distance between latitude and longitude
        $theta    = $longitudeFrom - $longitudeTo;
        $dist    = sin(deg2rad($latitudeFrom)) * sin(deg2rad($latitudeTo)) +  cos(deg2rad($latitudeFrom)) * cos(deg2rad($latitudeTo)) * cos(deg2rad($theta));
        $dist    = acos($dist);
        $dist    = rad2deg($dist);
        $miles    = $dist * 60 * 1.1515;

        // Convert unit and return distance
        $unit = strtoupper($unit);
        if($unit == "K"){
            return round($miles * 1.609344, 2).' km';
        }elseif($unit == "M"){
            return round($miles * 1609.344, 2).' meters';
        }else{
            return round($miles, 2).' miles';
        }
    }

    // get the time between two addresses
    public static function getDeliveryTime($origin_address, $destination_address) {
        $origin_address = str_replace(' ', '+', $origin_address);
        $destination_address = str_replace(' ', '+', $destination_address);
        // dd($origin_address, $destination_address);
        $googleApiKey = config('geocoder.key');
        $geocodeTime = file_get_contents('https://maps.googleapis.com/maps/api/distancematrix/json?destinations=' . $destination_address . '&origins=' . $origin_address . '&units=imperial&key='.$googleApiKey);
        $outputTime = json_decode($geocodeTime);
        if($outputTime->rows[0]->elements[0]->status == 'ZERO_RESULTS'){
            return 'Zero results';
        }
        return $outputTime->rows[0]->elements[0]->duration;
    }

}

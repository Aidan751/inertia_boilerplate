<?php

namespace App\Packages;
use Exception;
use \Twilio\Rest\Client;
class TwilioPackage
{
    public static function sendSMS(string $to,string $message)
    {
        try{
            $account_sid = env('TWILLIO_SID');
            $auth_token = env('TWILLIO_AUTH_TOKEN');
            $twilio_number = env('TWILLIO_NUMBER');
            $client = new Client($account_sid, $auth_token);
            $client->messages->create(
                $to,
                array(
                    'from' => $twilio_number,
                    'body' => $message
                )
            );
        }
        catch(Exception $e){
            return "Error " . $e->getMessage();
        }
    }
}

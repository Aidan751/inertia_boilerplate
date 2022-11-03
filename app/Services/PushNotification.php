<?php

namespace App\Services;
use App\Models\UserToken;


class PushNotification
{
    public function sendPush($title, $body, $tokens)
    {
        if (count($tokens) > 0) {
            $url = "https://fcm.googleapis.com/fcm/send";
            $serverKey = config('services.fcm');
            $notification = array('title' => $title, 'body' => $body, 'sound' => 'default', 'badge' => '1');
            $arrayToSend = array('registration_ids' => $tokens, 'notification' => $notification, 'priority' => 'high');
            $json = json_encode($arrayToSend);
            $headers = array();
            $headers[] = 'Content-Type: application/json';
            $headers[] = 'Authorization: key=' . $serverKey;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);

            curl_setopt(
                $ch,
                CURLOPT_CUSTOMREQUEST,
                "POST"
            );
            curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            //Send the request
            $response = curl_exec($ch);
            //Close request
            if ($response === false) {
                die('FCM Send Error: ' . curl_error($ch));
            }
            curl_close($ch);
        } else {
            return null;
        }
    }
}
<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\UserToken;

use function PHPSTORM_META\elementType;

class PushNotification
{
    public function sendPush($title, $body, $users, $entityType, $id)
    {

        foreach($users as $user){
            $notification = new Notification;
            $notification->title = $title;
            $notification->body = $body;
            $notification->user_id = $user;
            $notification->entity_type = $entityType;
            $notification->push_id = $id;
            $notification->save();
        }


        $tokens = UserToken::whereIn('user_id', $users)->pluck('token')->toArray();

        if (count($tokens) > 0) {
            $url = "https://fcm.googleapis.com/fcm/send";
            $serverKey = config('services.fcm');
            $notification = array('title' => $title, 'body' => $body, 'sound' => 'default', 'badge' => '1');
            $data = array('entity_type' => $entityType, "id" => $id);
            $arrayToSend = array('registration_ids' => $tokens, 'notification' => $notification, 'data' => $data, 'priority' => 'high');
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

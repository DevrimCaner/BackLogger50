<?php
include_once '../../IGDB-Config.php';//This file is stores IGDB 'client_secret' and posting 'https://id.twitch.tv/oauth2/token' to getting tokken
//GetTokken() Func returns PHP array
class IGDB{
    public function GetSampleData($token){
        global $clientId;
        $url = 'https://api.igdb.com/v4/games/';
        $body = "fields *;";
        // Initialize cURL session
        $ch = curl_init($url);
        // Set cURL options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Client-ID: ' . $clientId,
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json',
        ]);
        // Execute cURL session
        $response = curl_exec($ch);
        // Close cURL session
        curl_close($ch);
        return $response;
    }
    public function GetToken(){
        global $clientId;
        global $clientSecret;
        // Prepare the POST data
        $postData = [
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
            'grant_type' => 'client_credentials'
        ];
        // Initialize cURL session
        $ch = curl_init('https://id.twitch.tv/oauth2/token');
        // Set cURL options
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Execute the cURL request
        $response = curl_exec($ch);
        // Close cURL session
        curl_close($ch);
        // Decode and display the response
        return json_decode($response, true);
    }
}
?>
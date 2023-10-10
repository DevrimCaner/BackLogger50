<?php
include_once '../../IGDB-Config.php';//This file is stores IGDB 'client_secret' and 'client_id'
class IGDB{
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
    public function GetGamesData($token, $idString){
        global $clientId;
        $url = 'https://api.igdb.com/v4/games/';
        $body = "fields id, name; where id=".$idString.";";
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
        if (curl_errno($ch)) {
            curl_close($ch);
            ExitWError('Curl Action Failed!');
        }
        curl_close($ch);
        return $response;
    }
    public function GetGamesCovers($token, $idString){
        global $clientId;
        $url = 'https://api.igdb.com/v4/covers';
        $body = "fields image_id, height, width, game; where game=".$idString.";";
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
        if (curl_errno($ch)) {
            curl_close($ch);
            ExitWError('Curl Action Failed!');
        }
        curl_close($ch);
        return $response;
    }
    public function SearchGamesData($token, $searchText){
        global $clientId;
        $url = 'https://api.igdb.com/v4/games/';
        $body = "fields id, name, cover; search \"". $searchText ."\"; where version_parent = null & category = 0 & cover != null; limit 10;";
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
        if (curl_errno($ch)) {
            curl_close($ch);
            ExitWError('Curl Action Failed!');
        }
        curl_close($ch);
        return $response;
    }
    
    // DEVELOPMENT FUNC
    public function GetSampleData($token){
        global $clientId;
        $url = 'https://api.igdb.com/v4/games/';
        $body = "fields id, name, cover, first_release_date; where id=133004;";
        //$body = "fields *; search \"Assassins Creed\";";
        //$url = 'https://api.igdb.com/v4/covers';
        //$body = "fields *; where game=(133004, 55056); sort id;";
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
        if (curl_errno($ch)) {
            curl_close($ch);
            ExitWError('Curl Action Failed!');
        }
        curl_close($ch);
        return $response;
    }
}
?>
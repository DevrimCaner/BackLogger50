<?php
include_once 'config/header-config.php';
include_once '../../IGDB-Auth.php';//This file is stores IGDB 'client_secret' and posting 'https://id.twitch.tv/oauth2/token' to getting tokken
//GetTokken() Func returns PHP array
include_once 'library/Response.php';
include_once 'library/Database.php';

// Get Data Posted
$data = json_decode(file_get_contents('php://input'), true);
// Check Data exist
if(!$data){
    ExitWError('Data Not Found');
}
// Check Action
if(!isset($data['action'])){
    ExitWError('Action Not Found');
}
//Action Handler
switch($data['action']){
    case 'test':
        ExitWError('Test Successful!');
    break;
    case 'igdb-tokken':
        /*
        $user = $data['user'];
        $password = $data['password'];
        $user = CheckCredentials($user, $password);
        */
        echo json_encode(GetTokken());
        exit;
    break;
    default:
        ExitWError('Unknown Action');
    break;
}

?>
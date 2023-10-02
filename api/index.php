<?php
//hash('sha256', $test)
//date("Y-m-d H:i:s")
include_once 'config/header-config.php';
include_once 'library/Response.php';
include_once 'library/Database.php';
include_once 'library/IGDB.php';

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
        //ExitWError('Test Successful!');
        $token = $data['token'];
        $igdb = new IGDB();
        echo json_encode($igdb->GetSampleData($token));
    break;
    case 'igdb-token':
        /*
        $user = $data['user'];
        $password = $data['password'];
        $user = CheckCredentials($user, $password);
        */
        $igdb = new IGDB();
        echo json_encode($igdb->GetToken());
        exit;
    break;
    case 'register':
        print_r($data);
    break;
    case 'login':
        print_r($data);
    break;
    default:
        ExitWError('Unknown Action');
    break;
}

?>
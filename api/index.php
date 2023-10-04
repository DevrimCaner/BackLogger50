<?php
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
        //hash('sha256', $test)
        $igdb = new IGDB();
        echo json_encode($igdb->GetToken());
        exit;
    break;
    // Register Actions
    case 'register':
        // Get Posted Values
        $name = isset($data['user']) ? $data['user'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $mail = isset($data['mail']) ? $data['mail'] : null;
        // Create User
        $user = new User($name, $password, $mail);
        // Add new user to database
        $database = new Database($db);
        $register = $database->RegisterUser($user); // Register Function make its own control
        if($register){
            ExitWSuccess('Registration is Successful!');
        }
        ExitWError('Error in Registration');
    break;
    case 'login':
        $user = $data['user'];
        $password = $data['password'];
        print_r($data);
    break;
    default:
        ExitWError('Unknown Action');
    break;
}

?>
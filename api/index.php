<?php
include_once 'config/header-config.php';
include_once 'library/Response.php';
include_once 'library/Database.php';
include_once 'library/IGDB.php';

session_start();

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
        $token = $data['token'];
        $igdb = new IGDB();
        $database = new Database($db);
        echo json_encode($igdb->GetSampleData($token));
    break;
    case 'igdb-token':
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
    // Login Actions
    case 'login':
        $name = isset($data['user']) ? $data['user'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $user = new User($name, $password);
        $database = new Database($db);
        $check = $database->CheckCredentials($user);
        if($check){
            $_SESSION['user'] = $user;
            $_SESSION['loggedIn'] = true;
            ExitWSuccess('Login is Successful!');
        }
        ExitWError('Username or Password Incorrect');
    break;
    // Loguot Actions
    case 'logout':
        session_destroy();
        ExitWSuccess('Logout successful!');
    break;
    // Returns Backlog list of current
    case 'get-list':
        if(!isset($data['token'])){
            ExitWError('Token not found');
        }
        $token = $data['token'];
        $name = isset($data['user']) ? $data['user'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $user = new User($name, $password);
        $database = new Database($db);
        $userId = $database->CheckCredentials($user);
        if(!$userId){
            ExitWError('Auth Failed');
        }
        $list = $database->GetList($userId);
        if(!$list){
            ExitWError('No list found');
        }
        // Setup Id String
        $idString = "(";
        foreach($list as $key => $row){
            if($key != 0){
                $idString = $idString . ',';
            }
            $idString = $idString . $row['content_id'];
        }
        $idString = $idString . ')';
        // Get Games
        $igdb = new IGDB();
        $games = $igdb->GetGamesData($token, $idString);
        $games = json_decode($games);
        $covers = $igdb->GetGamesCovers($token, $idString);
        $covers = json_decode($covers);
        $response = array();
        foreach($games as $key => $game){
            $current = new stdClass();
            $current->id = $game->id;
            $current->name = $game->name;
            $current->status = $list[$key]['status'];
            $current->cover = $covers[$key]->url;
            // Push
            $response[] = $current;
        }
        echo json_encode($response);
    break;
    default:
        ExitWError('Unknown Action');
    break;
}

?>
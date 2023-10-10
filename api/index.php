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
        $games = json_decode($igdb->GetGamesData($token, $idString));
        $covers = json_decode($igdb->GetGamesCovers($token, $idString));
        echo json_encode(CreateGamesReult($games, $covers, $list));
    break;
    case 'game-search':
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
        // Search Actions
        $searchString = isset($data['searchText']) ? htmlspecialchars(trim($data['searchText'])) : null;
        if(!$searchString){
            ExitWError('Search Failed');
        }
        $igdb = new IGDB();
        $games = json_decode($igdb->SearchGamesData($token, $searchString));
        // Setup Id String
        $idString = "(";
        foreach($games as $key => $row){
            if($key != 0){
                $idString = $idString . ',';
            }
            $idString = $idString . $row->id;
        }
        $idString = $idString . ')';
        $covers = json_decode($igdb->GetGamesCovers($token, $idString, false));
        echo json_encode(CreateGamesReult($games, $covers));

    break;
    default:
        ExitWError('Unknown Action');
    break;
}
function CreateGamesReult($games, $covers, $list = null){
    $response = array();
    foreach($games as $key => $game){
        $current = new stdClass();
        $current->id = $game->id;
        $current->name = $game->name;
        $current->cover = FindImageinCovers($covers,$game->id);
        if(isset($list)){
            $current->status = $list[$key]['status'];
        }
        // Push
        $response[] = $current;
    }
    return $response;
}
function FindImageinCovers($covers, $gameID){
    foreach($covers as $cover){
        if($gameID == $cover->game){
            return $cover->image_id;
        }
    }
    return 0;
}
?>
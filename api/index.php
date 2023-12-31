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
        //print_r($games);
        //echo '///////////////////////';
        //print_r($covers);
        //exit;
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
        $result = CreateGamesReult($games, $covers);
        $userListed = $database->GetListAsId($userId);
        // Set Listed values to games
        foreach($result as $game){
            $currentListed = 0;
            if(in_array($game->id, $userListed)){
                $currentListed = 1;
            }
            $game->listed = $currentListed;
        }
        echo json_encode($result);

    break;
    case 'add-game':
        $name = isset($data['user']) ? $data['user'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $user = new User($name, $password);
        $database = new Database($db);
        $userId = $database->CheckCredentials($user);
        if(!$userId){
            ExitWError('Auth Failed');
        }
        $game = isset($data['game']) ? $data['game'] : null;
        $gameName = isset($data['gameName']) ? $data['gameName'] : '';
        $add = $database->AddGame($game, $userId);
        if($add){
            ExitWSuccess($gameName . ' Added successful!');
        }
    break;
    case 'complate-game':
        $name = isset($data['user']) ? $data['user'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $user = new User($name, $password);
        $database = new Database($db);
        $userId = $database->CheckCredentials($user);
        if(!$userId){
            ExitWError('Auth Failed');
        }
        $game = isset($data['game']) ? $data['game'] : null;
        $gameName = isset($data['gameName']) ? $data['gameName'] : '';
        $update = $database->ComplateGame($game, $userId);
        if($update){
            ExitWSuccess($gameName . ' Complated!');
        }
    break;
    case 'relist-game':
        $name = isset($data['user']) ? $data['user'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $user = new User($name, $password);
        $database = new Database($db);
        $userId = $database->CheckCredentials($user);
        if(!$userId){
            ExitWError('Auth Failed');
        }
        $game = isset($data['game']) ? $data['game'] : null;
        $gameName = isset($data['gameName']) ? $data['gameName'] : '';
        $update = $database->ReListGame($game, $userId);
        if($update){
            ExitWSuccess($gameName . ' Relisted');
        }
    break;
    case 'delete-game':
        $name = isset($data['user']) ? $data['user'] : null;
        $password = isset($data['password']) ? $data['password'] : null;
        $user = new User($name, $password);
        $database = new Database($db);
        $userId = $database->CheckCredentials($user);
        if(!$userId){
            ExitWError('Auth Failed');
        }
        $game = isset($data['game']) ? $data['game'] : null;
        $gameName = isset($data['gameName']) ? $data['gameName'] : '';
        $delete = $database->DeleteGame($game, $userId);
        if($delete){
            ExitWSuccess($gameName . ' Deleted successful!');
        }
    break;
    default:
        ExitWError('Unknown Action');
    break;
}
// CUSTOM FUNCTIONS
function CreateGamesReult($games, $covers, $list = null){
    $response = array();
    foreach($games as $key => $game){
        $game->cover = FindImageinCovers($covers,$game->id);
        if(isset($list)){
            $game->status = $list[$key]['status'];
        }
        // Push
        $response[] = $game;
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
<?php
include_once 'config/database-config.php';

class Database{
    protected PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }
    public function CheckCredentials(User $user = null){
        if(!$user){
            return 0;
        }
        if(!$user->CheckName()){
            return 0;
        }
        if(!$user->CheckPassword()){
            return 0;
        }
        $query = $this->db->prepare("SELECT id FROM users WHERE name = :name AND password = :password");
        $query->execute([
            'name' => $user->name,
            'password' => $user->password
        ]);
        $result = $query->fetch(PDO::FETCH_ASSOC);
        if($result){
            return $result['id'];
        }
        return 0;
    }
    public function RegisterUser(User $user = null){
        if(!$user){
            ExitWError('Invaild User Data !');
        }
        if(!$user->CheckName()){
            ExitWError('Invaild Name Value');
        }
        if(!$user->CheckPassword()){
            ExitWError('Invaild Password Value');
        }
        if(!$user->CheckMail()){
            ExitWError('Invaild Mail Value');
        }
        //Check UserName Exist
        if($this->UserNameExist($user->name)){
            ExitWError('This Username is already taken');
        }
        if($this->UserMailExist($user->mail)){
            ExitWError('This mail is using by another user');
        }
        // INSERT
        $query = $this->db->prepare("INSERT INTO users SET 
        name = :name,
        mail = :mail,
        password = :password,
        created = :created");
        $insert = $query->execute([
            'name' => $user->name,
            'mail' => $user->mail,
            'password' => $user->password,
            'created' => date("Y-m-d H:i:s")
        ]);
        if($insert){
            return true;
        }
        return false;
    }
    public function GetList($id){
        if(!is_numeric($id)){
            return null;
        }
        $query = $this->db->prepare("SELECT content_id, status FROM lists WHERE user_id = :id ORDER BY content_id");
        $query->execute([
            'id' => $id
        ]);
        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
    public function UserMailExist($mail){
        $query = $this->db->prepare("SELECT COUNT(id) FROM users WHERE mail = :mail");
        $query->execute([
            'mail' => $mail
        ]);
        $result = $query->fetch(PDO::FETCH_ASSOC);
        if($result['COUNT(id)'] == 0){
            return false;
        }
        return true;
    }
    public function UserNameExist($name){
        $query = $this->db->prepare("SELECT COUNT(id) FROM users WHERE name = :name");
        $query->execute([
            'name' => $name
        ]);
        $result = $query->fetch(PDO::FETCH_ASSOC);
        if($result['COUNT(id)'] == 0){
            return false;
        }
        return true;
    }
}

class User{
    public $name;
    public $password;
    public $mail;

    public function __construct($name, $password, $mail = '') {
        $this->name = htmlspecialchars(trim($name));
        $this->password = htmlspecialchars(trim($password));
        $this->mail = htmlspecialchars(trim($mail));
    }
    public function CheckName(){
        if(!$this->name || $this->name == null){
            return false;
        }
        if(strlen($this->name) < 4 || strlen($this->name) > 32){
        return false;
        }
        return true;
    }
    public function CheckMail(){
        if(!$this->mail || $this->mail == null){
            return false;
        }
        if(strlen($this->mail) < 4 || strlen($this->mail) > 64){
            return false;
        }
        if (!str_contains($this->mail, '@')) {
            return false;
        }
        return true;
    }
    public function CheckPassword(){
        if(!$this->password || $this->password == null){
            return false;
        }
        if(strlen($this->password) != 64){
            return false;
        }
        return true;
    }
}
?>
<?php
include '../../IGDB-Auth.php';//This file is stores IGDB 'client_secret' and posting 'https://id.twitch.tv/oauth2/token' to getting tokken
if(function_exists('GetTokken')){
    echo "GetTokkenExist";
}
else {
    echo "No GetTokken Func";
}
?>
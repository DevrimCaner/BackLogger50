<?php
function ExitWError($message){
    $response['error'] = $message;
    ExitWJSON($response);
}
function ExitWJSON($response){
    echo json_encode($response);
    exit;
}
?>
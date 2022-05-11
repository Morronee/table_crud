<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once '../db.php';


$postData = file_get_contents('php://input');

$data = json_decode($postData, true);


$firstName = $data['firstName'];
$lastName = $data['lastName'];
$patronymic = $data['patronymic'];

$getData = mysqli_query($connect, "SELECT * FROM `table_testing` WHERE firstName = '$firstName' and lastName = '$lastName' and patronymic = '$patronymic'");

$checkUniqueData = mysqli_fetch_assoc($getData);

if (count($checkUniqueData) === 0) {
    mysqli_query($connect,
        "INSERT INTO `table_testing` (`firstName`, `lastName`, `patronymic`) VALUES ('$firstName', '$lastName', '$patronymic')");
    echo json_encode(array("id" => mysqli_insert_id($connect)));
} else {
//    echo json_encode(array("error" => "Пользователь уже существует"));
    header('HTTP/1.1 422 Internal Server Booboo');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => 'Такой пользователь уже существует', 'code' => 1337)));
}


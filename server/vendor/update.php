<?php
require_once '../db.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$id = $data['id'];
$firstName = $data['firstName'];
$lastName = $data['lastName'];
$patronymic = $data['patronymic'];


$getData = mysqli_query($connect, "SELECT * FROM `table_testing` WHERE firstName = '$firstName' and lastName = '$lastName' and patronymic = '$patronymic'");

$checkUniqueData = mysqli_fetch_assoc($getData);

if (count($checkUniqueData) === 0) {
    if (!empty($connect)) {
        mysqli_query($connect, "UPDATE `table_testing` SET `firstName` = '$firstName', `lastName` = '$lastName', `patronymic` = '$patronymic' WHERE `table_testing`.`id` = '$id'");
        echo 'Пользователь изменен';
    }
} else {
    header('HTTP/1.1 422 Internal Server Booboo');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => 'Такой пользователь уже существует', 'code' => 1337)));
}




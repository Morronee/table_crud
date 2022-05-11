<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../db.php';


$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$id = $data['id'];


if (!empty($connect)) {
    $user = mysqli_query($connect, "SELECT * FROM `table_testing` WHERE id = '$id'");
}

$user = mysqli_fetch_assoc($user);

if ($user !== null) {
    echo json_encode($user);
} else {
    echo 'Пользователя не существует';
}

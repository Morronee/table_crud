<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
require_once '../db.php';



if (!empty($connect)) {
    $users = mysqli_query($connect, "SELECT * FROM `table_testing`");
}

$result = array();
while ($row = mysqli_fetch_assoc($users)) {
    $result[] = $row;
}

echo json_encode($result);
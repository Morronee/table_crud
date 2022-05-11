<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once '../db.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$id = $data['id'];

mysqli_query($connect, "DELETE FROM `table_testing` WHERE `table_testing`.`id` = '$id'");
echo json_encode(array('succes' => 'delete user'));

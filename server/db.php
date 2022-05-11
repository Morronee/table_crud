<?php
const DB_HOST = '*******';
const DB_USER = '********';
const DB_PASSWORD = '*******';
const DB_NAME = '********';



$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if (!$connect) {
    die('Ошибка подключения к БД');
}
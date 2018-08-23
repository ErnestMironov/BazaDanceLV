<?php
$return = array();
$return['error'] = array();
$return['error']['code'] = 2;
$return['error']['msg'] = 'Введите номер телефона';

echo json_encode($return);

?>
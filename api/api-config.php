<?php

$apiRoot = __DIR__;

include $apiRoot . '/classes/db_class.php';
include $apiRoot . '/classes/bb_api_class.php';
include $apiRoot . '/classes/custom_data_class.php';
include $apiRoot . '/classes/riot_api_class.php';
include $apiRoot . '/classes/utilities_class.php';
include $apiRoot . '/classes/bb_error_class.php';
include $apiRoot . '/classes/bb_response_class.php';
include $apiRoot . '/classes/db_interaction_class.php';

date_default_timezone_set('America/Denver');

$instance = Database::getInstance();
$db = $instance->getConnection(); 

DB_Interaction::getDBFields();

?>
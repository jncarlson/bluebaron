<?php
	
include './api-config.php';


$data = file_get_contents('php://input');
$data = json_decode($data);
$data = (array) $data;

$data['region'] = strtolower($data['region']);


if ( !isset( $data['id'] ) && !isset( $data['region'] ) && !isset( $data['partial'] ) ) {
	Utilities::BBExit( '69', 'bb_api' );
}

if ( !Utilities::verifyRequestVars( $data ) ) {
	Utilities::BBExit( '420', 'bb_api' );
}

if ( $data['partial'] == 'initialize' ) {
	$refresh = isset( $data['update'] ) ? true : false;
	if ( !DB_Interaction::canUserRefresh( $data['id'], $data['region'] ) && $refresh ) {
		$timeUntilRefresh = DB_Interaction::getTimeUntilUserCanRefresh( $data['id'], $data['region'] );
		Utilities::bbExit( '666', 'bb_api', "You have $timeUntilRefresh[minutes] minutes $timeUntilRefresh[seconds] seconds until you can refresh." );
	}
	$api = new BBApi();
	$api->appInit( $data['id'], $data['region'], $refresh );
} else {
	$api = new BBApi( $data['id'], $data['region'] );
	$api->getDataForApi( $data['partial'] );
}





?>
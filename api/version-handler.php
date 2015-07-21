<?php
if ( isset( $_POST['submit'] ) ) {
	$json = array();
	$addition = array();
	if ( file_exists('static_data/version.json') ) {
		$version = file_get_contents('static_data/version.json');
		$json = json_decode( $version, true );
	}
	$addition['title'] = $_POST['title'];
	$addition['date'] = $_POST['date'];
	$addition['announcement'] = $_POST['announcement'];
	$addition['additions'] = array();
	for ( $i = 0; $i < count( $_POST['tag'] ); $i++ ) {
		$addition['additions'][ $i ]['item'] = $_POST['item'][ $i ];
		$addition['additions'][ $i ]['tag'] = $_POST['tag'][ $i ];
	}
	$json[] = $addition;
	$newJson = json_encode($json);
	file_put_contents( 'static_data/version.json', $newJson );
	echo $newJson;

} else {
var_dump($_POST);
}
?>
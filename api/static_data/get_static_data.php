<?php

include '../classes/riot_api_class.php';
include '../classes/static_resources_class.php';

$riot = new RiotAPI();
$staticResources = new StaticResources( $riot );
$staticResources->saveStaticResources();

?>
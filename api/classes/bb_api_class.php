<?php
class BBApi {

	function __construct( $playerId = '', $region = '' ) {

		$this->playerId = $playerId;
		$this->region = strtolower( $region );
		return $this;

	}

	public function appInit( $username, $region, $refresh ) {

		if ( ( $summonerId = DB_Interaction::userExists( $username, $region ) ) && !$refresh ) {
			$response = new Response( array( 'player_id' => $summonerId, 'region' => $region ) );
			exit( $response->getResponse() );
		}
		$riot = new RiotApi( $username, $region, $refresh );
		$data = $riot->getApiData();
		$custom = new CustomData( $data );
		$custom = $custom->getCustomData();
		
		if ( DB_Interaction::insertRiotData( $custom, $refresh ) ) {
			$response = new Response( array( 'player_id' => $custom['summoner_id'], 'region' => $custom['region'] ) );
			exit( $response->getResponse() );
		} else {
			Utilities::bbExit( '23', 'bb_api' );
		}
		

	}

	public function getDataForApi( $dataType ) {
		
		if ( strpos( $dataType, 'static' ) > -1 ) {
			$data = $this->getStaticData( $dataType );
		} else {
			$data = DB_Interaction::getApiDataFromDB( $this->playerId, $this->region, $dataType );
		}
		$response = new Response( $data );
		exit( $response->getResponse() );

	}

	private function getStaticData( $type ) {

		global $apiRoot;
		$file = "$apiRoot/static_data/json_archive/$type.json";
		$json = file_get_contents( $file );
		return json_decode( $json, true );

	}


}
?>
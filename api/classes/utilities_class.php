<?php

class Utilities {
	
	function __construct() { /* static class */ }

	public static function verifyRequestVars( $request ) {

		// We don't need to verify if we are initializing
		if ( $request['partial'] == 'initialize' ) {
			return true;
		}
		$allowedCalls = array(
			'region' => array("na", "euw", "eune", "br", "tr", "ru", "lan", "las", "oce", "kr"),
			'partial' => array(
				'league',
				'metrics',
				'runes',
				'masteries',
				'champion',
				'ranked_history',
				'unranked_history',
				'initialize',
                'summoner',
                'team_data',
//                 static calls
                'static_champions',
                'static_ideals',
                'static_items',
                'static_masteries',
                'static_runes',
                'static_spells',
                'static_rune-map'
			)
		);

		if ( in_array( $request['region'], $allowedCalls['region'] ) 
			&& in_array( $request['partial'], $allowedCalls['partial'] )
			&& !!intval( $request['id'] ) ) {
			return true;
		} else {
			return false;
		}

	}

	public static function bbExit( $code, $location, $message = '' ) {
		
		$exit = new BBExit( $code, $location, $message );
		$exit->exitMessage();

	}

}

?>
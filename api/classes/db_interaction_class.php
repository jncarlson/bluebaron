<?php

// TODO match customData with dbFields
class DB_Interaction {

	// pull this from db columns and make this class not static
	private static $dbFields;

	private function __construct() { /* Static Class */ }

	public static function getDBFields() {

		global $db;
		$sql = "SHOW COLUMNS FROM summoner;";
		$result = $db->query( $sql );
		$fields = array();
		while($row = $result->fetch_assoc()) {
			$fields[] = $row['Field'];
		}
		self::$dbFields = $fields;

	}

	public static function insertRiotData( $customData, $refresh ) {

		global $db;
		if ( $refresh ) {
			$sql = self::buildUpdateString( 'summoner', $customData );
		} else {
			$sql = self::buildInsertString( 'summoner', $customData );
		}
		if ( $db->query( $sql ) ) {
			return true;
		} else {
			return false;
		}
		

	}

	public static function buildInsertString( $table, $insertArray ) {

		global $db;
		$fields = '';
		$values = '';
		$sql = "INSERT INTO $table";
		foreach ( self::$dbFields as $field ) {
			if ( !in_array( $field, array_keys( $insertArray ) ) ) {
				continue;
			}
			$fields .= "$field,";
			if ( is_array( $insertArray[ $field ] ) ) {
				$values .= "'" . $db->real_escape_string( json_encode( $insertArray[ $field ] ) ) . "',";
			} else {
				$values .= "'" . $insertArray[ $field ] . "',";
			}
		}
		$fields = trim( $fields, ',' );
		$values = trim( $values, ',' );
		$sql .= " ($fields) VALUES ($values);";
		return $sql;

	}

	private static function buildUpdateString( $table, $insertArray ) {

		global $db;
		$setString = '';
		$sql = "UPDATE $table SET";
		foreach ( self::$dbFields as $field ) {
			if ( !in_array( $field, array_keys( $insertArray ) ) || $field == 'summoner' ) {
				continue;
			}
			if ( is_array( $insertArray[ $field ] ) ) {
				$setString .= "$field='" . $db->real_escape_string( json_encode( $insertArray[ $field ] ) ) . "',";
			} else {
				$setString .= "$field='" . $insertArray[ $field ] . "',";
			}
		}
		$sql .= " $setString time=now() WHERE summoner_id=$insertArray[summoner_id] AND region='$insertArray[region]';";
		return $sql;

	}

	public static function getDataByFields( $fields ) {

		global $db;
		$sql = self::buildSelectString( $table, $fields );
		$result = $db->query( $sql );
		return self::getResultData( $result );
	}

	public static function getApiDataFromDB( $playerId, $region, $dataType ) {

		if ( in_array( $dataType, self::$dbFields ) ) {
			$sql = "SELECT `$dataType` FROM `summoner` WHERE summoner_id=$playerId AND region='$region';";
			return self::getResultData( $sql, $dataType );
		} else {
			Utilities::BBExit( '42', 'bb_api' );
		}

	}

	private static function getResultData( $sql, $type = null ) {

		global $db;
		$result = $db->query( $sql );
		if ( is_bool( $result ) ) {
			return $result;
		} else {
			$data = array();
			while ( $row = $result->fetch_assoc() ) {
				$data = $row;
			}
			if ( $type !== null ) {
				$json = self::isDataJSON( $data[ $type ] );
				return $json ? $json : $data;
			} else {
				return $data;
			}
		}

	}

	private static function isDataJSON( $data ) {
		return json_decode( $data, true );
	}

	/**
		* @desc checks if a user is in the database
		* @params 
			$username - player username
			$region - player region
		* @return 
			false if not in database and has not been updated in 3 days. 
			Summoner id if in the database and has been updated in within 3 days.
	*/
	// need to refactor so that getresultdata takes an array of types
	public static function userExists( $username, $region ) {

		$sql = "SELECT `summoner_id`, `time` FROM `summoner` WHERE summoner='$username' AND region='$region';";
		$result = self::getResultData( $sql );

		if ( $result && strtotime( $result['time'] ) > strtotime('-3 day')) {
			return $result['summoner_id'];
		} else {
			return false;
		}

	}

	public static function canUserRefresh( $summonerId, $region ) {

		$sql = "SELECT `time` FROM `summoner` WHERE summoner_id=$summonerId AND region='$region';";
		$result = self::getResultData( $sql );
		if ( time() > strtotime( '+30 minutes', strtotime( $result['time'] ) ) ) {
			return true;
		} else {
			return false;
		}

	}

	public static function getTimeUntilUserCanRefresh( $summonerId, $region ) {

		$sql = "SELECT `time` FROM `summoner` WHERE summoner_id=$summonerId AND region='$region';";
		$result = self::getResultData( $sql );
		$difference = strtotime( '+30 minutes', strtotime( $result['time'] ) ) - time();
		return array( 'minutes' => round(abs($difference) / 60), 'seconds' => abs($difference) % 60 );
		
	}

}
?>
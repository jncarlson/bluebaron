<?php

class BBExit {

	private $messages = array(
		'riot_api' => array(
			'0'   => '0 (No Response)',
            '400' => '400 (Bad Request)',
			'401' => '401 (Unauthorized)',
			'404' => '404 (Not Found)',
			'429' => '429 (Rate Limit Exceeded)',
			'500' => '500 (Internal Server Error)',
			'503' => '503 (Service Unavailable)'
		),
		'bb_api' => array(
			'23' => '23 (Unable to insert riot data into the database)',
			'42' => '42 (Trying to access nonexistent database column)',
			'69' => '69 (Your request is bad and you should feel bad)',
			'420' => "420 (Don't try any funny business)",
			'666' => "666 (Sorry you can't refresh yet)"
		),
		'twitch_api' => array()
	);

	/**
		* @desc sets environment variables and calls the createMessage method
		* @params 
			$code - the error code
			$location - the location of the error
		* @return the object instance for method chaining
	*/
	function __construct( $code, $location, $message ) {

		$this->code = $code;
		$this->location = $location;
		$this->createMessage( $message );
		return $this;

	}

	/**
		* @desc creates message for exit
		* @params none
		* @return void
	*/
	private function createMessage( $message ) {

		$response = array(
			'status' => intval($this->code),
			'message' => $message != '' ? $message : $this->messages[ $this->location ][ $this->code ]
		);
		$this->message = json_encode( $response );

	}

	/**
		* @desc exits with error code and message
		* @params none
		* @return void
	*/
	public function exitMessage() {

		exit( $this->message );

	}

}

?>
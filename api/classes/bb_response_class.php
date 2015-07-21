<?php
class Response {

	/**
		* @desc sets data property to the object
		* @params 
			$data - array of data to return to the application
		* @return $this - instance of the object for method chaining
	*/
	function __construct( $data ) {

		$this->data = $data;
		return $this;

	}

	/**
		* @desc creates response array and json encodes it
		* @params none
		* @return json data for response
	*/
	public function getResponse() {

		$response = array(
			'status' => 200,
			'data' => $this->data
		);
		return json_encode( $response );

	}

}
?>
<?php
/**
    * @desc Mysql database class - only one connection allowed
    * @usage 
        $db = Database::getInstance();
        $mysqli = $db->getConnection(); 
        $sql_query = "SELECT foo FROM .....";
        $result = $mysqli->query($sql_query);
*/
class Database {
	private $_connection;
	private static $_instance; //The single instance
	private $_host = "";
	private $_username = "";
	private $_password = "";
	private $_database = "";

	/**
        * @desc get an instance of the Database
        * @params none
        * @return Instance
	*/
	public static function getInstance() {
		if(!self::$_instance) { // If no instance then make one
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
        * @desc assign _connection to a new mysqli instance
        * @params none
        * @return void
    */
	private function __construct() {
		$this->dbConfig();
		$this->_connection = new mysqli($this->_host, $this->_username, 
			$this->_password, $this->_database);
	
		// Error handling
		if(mysqli_connect_error()) {
			trigger_error("Failed to conencto to MySQL: " . mysql_connect_error(),
				 E_USER_ERROR);
		}
	}

	// Magic method clone is empty to prevent duplication of connection
	private function __clone() { }

	/**
        * @desc get mysqli connection
        * @params none
        * @return mysqli connection
    */
	public function getConnection() {
		return $this->_connection;
	}

	/**
		* @desc parses .db-config and gets db connection info
		* @params none
		* @return void
	*/
	private function dbConfig() {
		global $apiRoot;
		$file = file_get_contents($apiRoot . '/.db-config');
		$config = explode("\n", $file);
		$keyval = array();
		$count = 1;
		foreach( $config as $line ) {
			if ( $count == 5 ) {
				continue;
			}
			$keyval = explode(" = ", $line);
			$this->$keyval[0] = $keyval[1];
			$count ++;
		}
	}
}
?>
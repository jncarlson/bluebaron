<?php

class RiotAPI {
    
    private $apiKey = '';
    private $apiCallTypes = array(
        'player_id',
        'match_history',
        'champion_info',
        'league_info',
        'match_info',
        'masteries',
        'runes'
//        'static_champions',
//        'static_masteries',
//        'static_items',
//        'static_runes',
//        'static_spells'
    );
    public $errors = array();
    private $apiData = array();
    private $teamData = array();
    private $lastCalledUrl = '';
    
    /**
        * @desc sets user data
        * @params
            $username   - user name of the player
            $region     - the region of the player
        * @returns void
    */
    function __construct( $username = null, $region = null, $refresh = false ) {
        
        if ( $username != null && $region != null ) {
            $this->username = $username;
            $this->region = strtolower( $region );
            if ( $refresh ) {
                $this->playerId = $username;
            } else {
                $this->playerId = $this->getPlayerId( $username, $region );
            }
        }
        
    }
    
    /**
        * @desc calls the riot api for all of needed app data
        * @params none
        * @return array of all of the api data
    */
    public function getApiData() {
        
        $this->getUserApiData();
        $this->playerDivision = $this->getPlayerDivision();
        $this->tierValue = $this->apiData['league_info'][ $this->playerId ][0]['tier'];
        // Add division to league data
        $this->apiData['league_info'][ $this->playerId ][0]['division'] = $this->playerDivision;
        $this->getMatchData();
        
        return $this->getMasterArray();
        
    }
    
    
    /**
        * @desc gets the player id from the username entered to the site
        * @params $username - the username of the user
        * @return returns the player id
    */
    public function getPlayerId( $username, $region ) {

        $name = mb_convert_case($username, MB_CASE_LOWER, "UTF-8");
        $name = str_replace(' ', '', $name);
        $userData = $this->apiCall( $name, $region, 'player_id' );

//        $name = mb_strtolower($username, "UTF-8");
//        $name = str_replace(' ', '', $name);
//        $userData = $this->apiCall( $name, $region, 'player_id' );
        
        return $userData[ $name ]['id'];
        
    }
    
    /**
        * @desc decides api call url based on the params given
        * @params 
            $playerId   - the id (or username if calling the player_id api call) of the player to get the data for
            $region     - the region of the player
            $type       - the type of api call to make see $apiCallTypes
        * @return the api call url string
    */
    
    private function getApiUrl( $type, $region, $id ) {
        
        $apiURLs = array(            
            'player_id'     => "https://$region.api.pvp.net/api/lol/$region/v1.4/summoner/by-name/$id?api_key=$this->apiKey",
            'match_history' => "https://$region.api.pvp.net/api/lol/$region/v2.2/matchhistory/" . $id . 
                "?rankedQueues=RANKED_SOLO_5x5,RANKED_TEAM_5x5&beginIndex=0&endIndex=15&api_key=$this->apiKey",
            'champion_info' => "https://$region.api.pvp.net/api/lol/$region/v1.3/stats/by-summoner/" . $id . 
                "/ranked?season=SEASON2015&api_key=$this->apiKey",
            'league_info'   => "https://$region.api.pvp.net/api/lol/$region/v2.5/league/by-summoner/" . $id . "?api_key=$this->apiKey",
            'match_info'    => "https://$region.api.pvp.net/api/lol/$region/v2.2/match/$id/?api_key=$this->apiKey",
            'masteries'     => "https://$region.api.pvp.net/api/lol/$region/v1.4/summoner/$id/masteries?api_key=$this->apiKey",
            'runes'         => "https://$region.api.pvp.net/api/lol/$region/v1.4/summoner/$id/runes?api_key=$this->apiKey"
//            'static_champions'  => "https://global.api.pvp.net/api/lol/static-data/$region/v1.2/champion?api_key=$this->apiKey",
//            'static_masteries'  => "https://global.api.pvp.net/api/lol/static-data/$region/v1.2/mastery?api_key=$this->apiKey",
//            'static_items'      => "https://global.api.pvp.net/api/lol/static-data/$region/v1.2/item?api_key=$this->apiKey",
//            'static_runes'      => "https://global.api.pvp.net/api/lol/static-data/$region/v1.2/rune?api_key=$this->apiKey",
//            'static_spells'     => "https://global.api.pvp.net/api/lol/static-data/$region/v1.2/summoner-spell?api_key=$this->apiKey",
        );
        
        return $apiURLs[ $type ];
    }
    
    /**
        * @desc calls the riot api for game data
        * @params 
            $playerId   - the id of the player to get the data for
            $region     - the region of the player
            $type       - the type of api call to make see $apiCallTypes
        * @return an associative array of game data for the type of api call
    */
    
    public function apiCall( $playerId, $region, $type ) {
        
        $ch;
        $curlConfig; 
        $result;
        $apiData;
        
        for ( $i = 0; $i < 5; $i++ ) {
            $this->lastCalledUrl = $this->getApiUrl( $type, $region, $playerId );
            $ch = curl_init();
            $curlConfig = array(
                CURLOPT_URL             => $this->getApiUrl( $type, $region, $playerId ),
                CURLOPT_POST            => false,
                CURLOPT_RETURNTRANSFER  => true,
                CURLOPT_VERBOSE         => true
            );
            curl_setopt_array( $ch, $curlConfig );            
            $result = curl_exec( $ch );
            $apiData  = json_decode( $result, true );
            
            if ( $this->responseHasErrors( $ch, $type, $i ) ) {
                sleep( 1 );
            } else {

                if($type === 'player_id'){

                    if (!isset($_COOKIE["recentSearch"])) {

                        $cookieValue = $playerId . ",/#/overview/" . $apiData[$playerId]['id'] . "/" . $region;
                        setcookie("recentSearch", $cookieValue, time() + (86400 * 30), "/");

                    } else if (!isset($_COOKIE["recentSearch2"])) {

                        $cookieValue = $playerId . ",/#/overview/" . $apiData[$playerId]['id'] . "/" . $region;
                        setcookie("recentSearch2", $cookieValue, time() + (86400 * 30), "/");

                    } else if (!isset($_COOKIE["recentSearch3"])) {

                        $cookieValue = $playerId . ",/#/overview/" . $apiData[$playerId]['id'] . "/" . $region;
                        setcookie("recentSearch3", $cookieValue, time() + (86400 * 30), "/");

                    } else if (!isset($_COOKIE["recentSearch4"])) {

                        $cookieValue = $playerId . ",/#/overview/" . $apiData[$playerId]['id'] . "/" . $region;
                        setcookie("recentSearch4", $cookieValue, time() + (86400 * 30), "/");

                    } else if (!isset($_COOKIE["recentSearch5"])) {

                        $cookieValue = $playerId . ",/#/overview/" . $apiData[$playerId]['id'] . "/" . $region;
                        setcookie("recentSearch5", $cookieValue, time() + (86400 * 30), "/");

                    } else {

                        $cookieValue = $playerId . ",/#/overview/" . $apiData[$playerId]['id'] . "/" . $region;
                        setcookie("recentSearch5", $_COOKIE['recentSearch4'], time() + (86400 * 30), "/");
                        setcookie("recentSearch4", $_COOKIE['recentSearch3'], time() + (86400 * 30), "/");
                        setcookie("recentSearch3", $_COOKIE['recentSearch2'], time() + (86400 * 30), "/");
                        setcookie("recentSearch2", $_COOKIE['recentSearch'], time() + (86400 * 30), "/");
                        setcookie("recentSearch", $cookieValue, time() + (86400 * 30), "/");

                    }
                }

                break;
            }
            
            curl_close( $ch );
        
        }
        
        return $apiData;
        
    }
    
    /**
        * @desc retrieves all api data for the current user, and sets it in the $apiData array with $playerId as the key
        * @params none
        * @returns void
    */
    private function getUserAPIData() {
        
        foreach( $this->apiCallTypes as $type ) {

            if ( $type != 'player_id' && $type != 'match_info' ) {
                $this->apiData[ $type ] = $this->apiCall( $this->playerId, $this->region, $type );
            }
            
        }
        
    }
    
    /**
        * @desc retrieves the player division from the league_info data
        * @params none
        * @returns player division
    */
    private function getPlayerDivision() {
        
        $division = $this->apiData['league_info'][ $this->playerId ][0]['entries'];

        foreach ( $division as $data ) {

            if ( $data['playerOrTeamId'] == $this->playerId  ) {
                return $data['division'];
            }
            
        }

    }
    
    
    /**
        * @desc gets data for the last 15 matches
        * @params none
        * @return an array of team data from each match
    */
    private function getMatchData() {
        
        $matchId;
        $matches = $this->apiData['match_history'];
        $matchArrayCount = count( $matches['matches'] );
        for ($i = 0; $i < $matchArrayCount; $i++) {

            $matchId = $matches['matches'][ $i ]['matchId'];
            $matchArray = $this->apiCall( $matchId, $this->region, 'match_info' );
            $participantIndex = $this->getMatchDataIndex( $matchArray, $this->playerId, 'summonerId', $matchArrayCount );
            $teamIndex = $this->getMatchDataIndex(
                $matchArray,
                $matchArray['participantIdentities'][ $participantIndex ]['participantId'],
                'participantId',
                $matchArrayCount
            );
            $finalTeamIndex = $this->getMatchDataIndex(
                $matchArray,
                $matchArray['participants'][ $teamIndex ]['teamId'],
                'matchTeam',
                2
            );
            $this->teamData[] = $matchArray['teams'][ $finalTeamIndex ];
            
        }
        
    }
    
    /**
        * @desc finds the index of the matchArray where the ids match
        * @params
            $matchArray         - the current iterations match array from it's parent function
            $id                 - the id of either the player, participant, or team
            $key                - the key of the $comparisonIdArray to grab the comparison id from
            $threshold          - the number at which to stop the for loop
        * @returns index of matching id
    */
    private function getMatchDataIndex( $matchArray, $id, $key, $threshold ) {
            
        $comparisonIdArray = array();
        
        for ($i = 0; $i < $threshold; $i++) {
            
            $comparisonIdArray = array(
                'summonerId' => $matchArray['participantIdentities'][ $i ]['player']['summonerId'],
                'participantId' => $matchArray['participants'][ $i ]['participantId'],
                'matchTeam' => $matchArray['teams'][ $i ]['teamId']
            );
            
            if ($id = $comparisonIdArray[ $key ]) {
                return $i;
            }
        }
        
    }
    
    /**
        * @desc collects all of the data from the api calls into one master array
        * @params none
        * @return master array of data from api calls
    */
    private function getMasterArray() {
        
        $masterArray = $this->apiData['match_history'];
        $masterArray['username'] = $this->username;
        $masterArray['player_id'] = $this->playerId;
        $masterArray['region'] = $this->region;
        $masterArray['teamData'] = $this->teamData;
        $masterArray['player_league'] = $this->tierValue;
        $masterArray['division'] = $this->playerDivision;
        $masterArray['champion'] = $this->apiData['champion_info'];
        $masterArray['runes'] = $this->apiData['runes'];
        $masterArray['masteries'] = $this->apiData['masteries'];
        $masterArray['league'] = $this->apiData['league_info'];
        return $masterArray;
    }
    
    /**
        * @desc gets all of the static data from the riot api
        * @params none
        * @return an array of static data from the riot api
    */    
    public function getStaticApiData() {
        
        $staticData = array();
        
        foreach ( $this->apiCallTypes as $key ) {
            
            if ( strpos( $key, 'static' ) !== false ) {
                $staticData[ $key ] = $this->apiCall( null, 'na', $key );
            }
            
        }
        
        return $staticData;
        
    }
    
    /**
        * @desc checks the status code of the cURL response
        * @params
            $ch     - cURL handle of request
            $type   - the type of api call
        * @return boolean depending on the http status of the request
    */
    private function responseHasErrors( $ch, $type, $i ) {
        
        $httpCode = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
        $error;

        if ( $httpCode === 200 ) { // The response was good
            $error = false;
        } else if ( $httpCode === 503 || $httpCode === 500 ) { // possibly an error at the time of the request so we will try again
            $this->errors[ $type ] = $httpCode;
            error_log("\n\n\nThere was an error with the $type call. With error code: $httpCode. Calling url: $this->lastCalledUrl\n\n\n");
            $error = true;
        } else { // something else went wrong log it and don't try again
            error_log("\n\n\nThere was an error with the $type call. With error code: $httpCode. Calling url: $this->lastCalledUrl\n\n\n");
            Utilities::bbExit( $httpCode, 'riot_api' );
        }
        if ( $error && $i == 4 ) {
            Utilities::bbExit( $httpCode, 'riot_api' );
        }
        return $error;
        
    }
    
}

?>
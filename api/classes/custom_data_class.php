<?php

// @todo remove $role from array unless BOTTOM lane with DUO_CARRY or DUO_SUPPORT role
	
class CustomData {

	private $customData = array();
	private $timeData 	= array();
	private $teamData 	= array();
	private $matches 	= array();
	private $avgs 		= array();
	private $champMap	= array();

	/**
		* @desc sets masterArray variable
		* @params 
			$masterArray - array returned from RiotApi::getApiData()
		* @return current object state for method chaining
	*/
	function __construct( $masterArray ) {

		$this->masterArray = $masterArray;
		$this->getChampMap();
		return $this;

	}

	/**
		* @desc makes array of id => champ from champion static data 
		* @params none
		* @return void
	*/
	private function getChampMap() {
		global $apiRoot;
		$json = file_get_contents($apiRoot . '/static_data/json_archive/static_champions.json');
		$champs = json_decode( $json, true );
		foreach ( $champs['data'] as $champ => $data ) {
			$this->champMap[ $data['id'] ] = $data['name'];
		}
	}

	/**
		* @desc calls functions to filter and average masterArray data
		* @params none
		* @return array of the filtered and averaged data
	*/
	public function getCustomData() {

		$customData = $this->filterData();
		$this->calcAvgs();

		$this->customData['ranked_history'] = $this->matches;
		$this->customData['team_data'] = $this->teamData;
		$this->customData['metrics'] = $this->timeData;

		return $this->customData;

	}

	/**
		* @desc sets data not being filtered into customData array and calls separate data type functions
		* @params none
		* @return void
	*/
	private function filterData() {

		$this->getMatchesData();
		$this->getTeamData();
		$this->getChampionData();

		// temp until adding unranked history call
		$this->customData['unranked_history'] = array();
		$this->customData['region'] = $this->masterArray['region'];
		$this->customData['summoner_id'] = $this->masterArray['player_id'];
		$this->customData['summoner'] = $this->masterArray['username'];
		$this->customData['league'] = $this->masterArray['league'];
		$this->customData['player_league'] = $this->masterArray['player_league'];
		$this->customData['division'] = $this->masterArray['division'];
		$this->customData['runes'] = $this->masterArray['runes'];
		$this->customData['masteries'] = $this->masterArray['masteries'];

	}

	/**
		* @desc loops through already filtered data to process averages data
		* @params none
		* @return void
	*/
	private function calcAvgs() {

		foreach ( $this->avgs as $lane => $roles ) {
			$this->processAvgRoles( $lane, $roles );			
		}

	}

	/**
		* @desc second layer of calculating averages. It separates averaging stats and time data
		* @params
			$lane - the lane that the data is from
			$roles - the array of roles and their data
		* @return void
	*/
	private function processAvgRoles( $lane, $roles ) {

		if ( $lane == 'BOTTOM' ) {
			foreach( $roles as $role => $data ) {
				$this->avgStats( $lane, $role, $data['stats'] );
				$this->avgTimeData( $lane, $role, $data );
			}
		} else {
			$this->avgStats( $lane, '', $roles['stats'] );
			$this->avgTimeData( $lane, '', $roles);
		}		

	}

	/**
		* @desc averages stats by the amount of times their lane and role has data
		* @params 
			$lane - the lane that the data is from
			$role - the role played in the game
			$stats - stats from the game
		* @return void
	*/
	private function avgStats( $lane, $role, $stats ) {

		foreach ( $stats as $stat => $value ) {
			if ( $stat == 'matchDuration' ) {
				continue;
			}
			if ( $stat != 'total' ) {
				if ( $lane == 'BOTTOM' ) {
					if ( $stat == 'wardsPlaced' ) {
						$this->timeData[ $lane ][ $role ]['stats']['wardsPlacedPerMin'] = $value['value'] / ( $stats['matchDuration']['value'] / 60 );
					}
					$this->timeData[ $lane ][ $role ]['stats'][ $stat ] = $value['value'] / $value['total'];
				} else {
					if ( $stat == 'wardsPlaced' ) {
						$this->timeData[ $lane ]['stats']['wardsPlacedPerMin'] = $value['value'] / ( $stats['matchDuration']['value'] / 60 );
					}
					$this->timeData[ $lane ]['stats'][ $stat ] = $value['value'] / $value['total'];
				}
				
			}

		}

	}

	/**
		* @desc averages time metrics by the type of metric
		* @params
			$lane - the lane that the data is from
			$role - the role played in the game
			$data - game data
		* @return void
	*/
	private function avgTimeData( $lane, $role, $data ) {

		unset( $data['stats'] );
		if ( $lane == 'BOTTOM' ) {
			foreach ( $data as $type => $metrics ) {
				$this->timeData[ $lane ][ $role ][ $type ]['zeroToTen'] 		= $metrics['zeroToTen'] / $metrics['total'];
				$this->timeData[ $lane ][ $role ][ $type ]['tenToTwenty'] 		= $metrics['tenToTwenty'] / $metrics['total'];
				$this->timeData[ $lane ][ $role ][ $type ]['twentyToThirty'] 	= $metrics['twentyToThirty'] / $metrics['total'];
				$this->timeData[ $lane ][ $role ][ $type ]['thirtyToEnd'] 		= $metrics['thirtyToEnd'] / $metrics['total'];
			}
		} else {
			foreach ( $data as $type => $metrics ) {
				$this->timeData[ $lane ][ $type ]['zeroToTen'] 			= $metrics['zeroToTen'] / $metrics['total'];
				$this->timeData[ $lane ][ $type ]['tenToTwenty'] 		= $metrics['tenToTwenty'] / $metrics['total'];
				$this->timeData[ $lane ][ $type ]['twentyToThirty'] 	= $metrics['twentyToThirty'] / $metrics['total'];
				$this->timeData[ $lane ][ $type ]['thirtyToEnd'] 		= $metrics['thirtyToEnd'] / $metrics['total'];
			}
		}

	}

	/**
		* @desc filters out unnecessary champion data
		* @params none
		* @return void
	*/
	private function getChampionData() {

		$filteredChamps = array();
		$champs = $this->masterArray['champion']['champions'];
		$champName = '';

		for ( $i = 0; $i < count( $champs ); $i++ ) {
			if ( array_key_exists( $champs[ $i ]['id'], $this->champMap ) ) {
				$champName = $this->champMap[ $champs[ $i ]['id'] ];
			} else {
				$champName = '';
			}
			$filteredChamps[ $i ]['id']
				= $champs[ $i ]['id'];
			$filteredChamps[ $i ]['name']
				= $champName;
			$filteredChamps[ $i ]['stats']['totalSessionsPlayed']
				= $champs[ $i ]['stats']['totalSessionsPlayed'];
			$filteredChamps[ $i ]['stats']['totalSessionsLost']
				= $champs[ $i ]['stats']['totalSessionsLost'];
			$filteredChamps[ $i ]['stats']['totalSessionsWon']
				= $champs[ $i ]['stats']['totalSessionsWon'];
			$filteredChamps[ $i ]['stats']['totalChampionKills']
				= $champs[ $i ]['stats']['totalChampionKills'];
			$filteredChamps[ $i ]['stats']['mostChampionKillsPerSession']
				= $champs[ $i ]['stats']['mostChampionKillsPerSession'];
			$filteredChamps[ $i ]['stats']['totalMinionKills']
				= $champs[ $i ]['stats']['totalMinionKills'];
			$filteredChamps[ $i ]['stats']['totalDeathsPerSession']
				= $champs[ $i ]['stats']['totalDeathsPerSession'];
			$filteredChamps[ $i ]['stats']['totalAssists']
				= $champs[ $i ]['stats']['totalAssists'];
		}

		$this->reorderChamps( $filteredChamps );

	}

	/**
		* @desc reorders champion data by totalSessionsPlayed and sets the reordered data to the customData array
		* @params
			$champs - array of champion data
		* @return void
	*/
	private function reorderChamps( $champs ) {

		$reordered = array();
		$order = array();
		$indexes = array();

		for ( $i = 0; $i < count( $champs ); $i++ ) {

			$order[] = $champs[ $i ]['stats']['totalSessionsPlayed'] . ':' . $i;

		}
		natsort( $order );
		$order = array_values( $order );
		for ( $i = count( $order ) - 1; $i >= 0; $i-- ) {

			$indexes = explode( ':', $order[ $i ] );
			$reordered[] = $champs[ $indexes[1] ];

		}

		$this->customData['champion'] = $reordered;

	}

	/**
		* @desc adds all of the team data together and then averages it
		* @params none
		* @return void
	*/
	private function getTeamData() {

		$filteredData = array(
			'winner' 		=> 0,
			'firstTower' 	=> 0,
			'firstBaron' 	=> 0,
			'firstDragon' 	=> 0,
			'towerKills' 	=> 0,
			'dragonKills' 	=> 0
		);
		$gameCount = count( $this->masterArray['teamData'] );

		// filter data
		for ($i = 0; $i < $gameCount; $i++ ) {
			$filteredData['winner'] 		+= $this->masterArray['teamData'][ $i ]['winner'] ? 1 : 0;
			$filteredData['firstTower'] 	+= $this->masterArray['teamData'][ $i ]['firstTower'] ? 1 : 0;
			$filteredData['firstBaron'] 	+= $this->masterArray['teamData'][ $i ]['firstBaron'] ? 1 : 0;
			$filteredData['firstDragon'] 	+= $this->masterArray['teamData'][ $i ]['firstDragon'] ? 1 : 0;
			$filteredData['towerKills'] 	+= $this->masterArray['teamData'][ $i ]['towerKills'];
			$filteredData['dragonKills'] 	+= $this->masterArray['teamData'][ $i ]['dragonKills'];
		}

		// average data
		foreach ( $filteredData as $stat => $datum ) {

			$this->teamData[ $stat ] = $datum / $gameCount;

		}

	}

	/**
		* @desc pushes filtered match data to the matches array
		* @params none
		* @return void
	*/
	private function getMatchesData() {

		foreach ( $this->masterArray['matches'] as $key => $array ) {

			array_push( $this->matches, $this->filterMatch( $array ) );
			$array['participants'][0]['stats']['matchDuration'] = $array['matchDuration'];
			$this->getAvgsData( $array['participants'] );

		}

	}

	/**
		* @desc filters unnecessary match data
		* @params
			$match - data of a single match
		* @return array of filtered match data
	*/
	private function filterMatch( $match ) {

		return array( 
			'matchId' 		=> $match['matchId'],
			'matchCreation' => $match['matchCreation'],
			'matchDuration' => $match['matchDuration'],
			'queueType' 	=> $match['queueType'],
			'season' 		=> $match['season'],
			'teamId' 		=> $match['participants'][0]['teamId'],
			'spell1Id' 		=> $match['participants'][0]['spell1Id'],
			'spell2Id' 		=> $match['participants'][0]['spell2Id'],
			'championId' 	=> $match['participants'][0]['championId'],
			'champion'		=> $this->champMap[ $match['participants'][0]['championId'] ],
			'lane'			=> $match['participants'][0]['timeline']['lane'],
			'stats'			=> $match['participants'][0]['stats'],
			'items' 		=> array(
				$match['participants'][0]['stats']['item0'],
				$match['participants'][0]['stats']['item1'],
				$match['participants'][0]['stats']['item2'],
				$match['participants'][0]['stats']['item3'],
				$match['participants'][0]['stats']['item4'],
				$match['participants'][0]['stats']['item5'],
				$match['participants'][0]['stats']['item6']
			)
		);

	}

	/**
		* @desc adds stats data together for averaging later
		* @params
			$lane - the lane that the data is from
			$role - the role played in the game
			$stats - the stats from the game
		* @return void
	*/
	private function getStatsData( $lane, $role, $stats ) {

		foreach( $stats as $stat => $value ) {
			if ( substr( $stat, 0, 4 ) == 'item' ) {
				continue;
			}
			if ( $lane == 'BOTTOM' ) {
				if ( !array_key_exists( $lane, $this->avgs ) ) {
					$this->avgs[ $lane ] = array();
				}
				if ( !array_key_exists( $role, $this->avgs[ $lane ] ) ) {
					$this->avgs[ $lane ][ $role ] = array();
					$this->avgs[ $lane ][ $role ]['stats'] = array();
				}
				if ( !array_key_exists( $stat, $this->avgs[ $lane ][ $role ]['stats'] ) ) {
					$this->avgs[ $lane ][ $role ]['stats'][ $stat ]['value'] = 0;
					$this->avgs[ $lane ][ $role ]['stats'][ $stat ]['total'] = 0;
				}
				if ( is_int( $value ) ) {
					$this->avgs[ $lane ][ $role ]['stats'][ $stat ]['value'] += $value;
					$this->avgs[ $lane ][ $role ]['stats'][ $stat ]['total']++;
				} else {
					$this->avgs[ $lane ][ $role ]['stats'][ $stat ]['value'] += $value === true ? 1 : 0;
					$this->avgs[ $lane ][ $role ]['stats'][ $stat ]['total']++;
				}
			} else {
				if ( !array_key_exists( $lane, $this->avgs ) ) {
					$this->avgs[ $lane ] = array();
					$this->avgs[ $lane ]['stats'] = array();
				}
				if ( !array_key_exists( $stat, $this->avgs[ $lane ]['stats'] ) ) {
					$this->avgs[ $lane ]['stats'][ $stat ]['value'] = 0;
					$this->avgs[ $lane ]['stats'][ $stat ]['total'] = 0;
				}
				if ( is_int( $value ) ) {
					$this->avgs[ $lane ]['stats'][ $stat ]['value'] += $value;
					$this->avgs[ $lane ]['stats'][ $stat ]['total']++;
				} else {
					$this->avgs[ $lane ]['stats'][ $stat ]['value'] += $value === true ? 1 : 0;
					$this->avgs[ $lane ]['stats'][ $stat ]['total']++;
				}
			}
		}

	}

	/**
		* @desc adds all stats and time data together with helper functions
		* @params
			$participants - participants array from masterArray
		* @return void
	*/
	private function getAvgsData( $participants ) {

		$role = $participants[0]['timeline']['role'];
		$lane = $participants[0]['timeline']['lane'];

		$this->getStatsData( $lane, $role, $participants[0]['stats'] );

		foreach ( $participants[0]['timeline'] as $type => $times ) {
			if ( gettype($times) == 'array' ) { 
				$this->avgsDataHelper( $role, $lane, $type, $times );
			}
		}

	}

	/**
		* @desc adds all time data together for averaging later
		* @params
			$lane - the lane that the data is from
			$role - the role played in the game
			$type - the type of time data ie. creepsPerMinDeltas, xpPerMinDeltas, etc.
			$times - the array of times and their data
		* @return void
	*/
	private function avgsDataHelper( $role, $lane, $type, $times ) {

		if ( $lane == 'BOTTOM' ) {
			if ( !array_key_exists( $type, $this->avgs[ $lane ][ $role ] ) ) {
				$this->avgs[ $lane ][ $role ][ $type ] = array(
					'zeroToTen' => 0,
					'tenToTwenty' => 0,
					'twentyToThirty' => 0,
					'thirtyToEnd' => 0,
					'total' => 0
				);
			}
			foreach ( $times as $time => $value ) {
				$this->avgs[ $lane ][ $role ][ $type ][ $time ] += $value;
			}
			$this->avgs[ $lane ][ $role ][ $type ]['total']++;
		} else {
			if ( !array_key_exists( $type, $this->avgs[ $lane ] ) ) {
				$this->avgs[ $lane ][ $type ] = array(
					'zeroToTen' => 0,
					'tenToTwenty' => 0,
					'twentyToThirty' => 0,
					'thirtyToEnd' => 0,
					'total' => 0
				);
			}
			foreach ( $times as $time => $value ) {
				$this->avgs[ $lane ][ $type ][ $time ] += $value;
			}
			$this->avgs[ $lane ][ $type ]['total']++;
		}
		

	}

}

?>
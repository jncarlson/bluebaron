<?php

$servername = "localhost";
$username = "root";
$password = "root";
$database = "bbangular";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


class findAverages{

    public $averages = [];
    public $averagesStorage = [];
    public $conn;

    public $role;
    public $metric;
    public $delta;

    function __construct($conn){
        $this->conn = $conn;
    }


    function averageTier($role, $metric, $delta, $roleName, $idealName, $tier){

        $tierData = mysqli_query($this->conn, "SELECT * FROM summoner WHERE player_league='$tier'");

        $this->averagesStorage= [];
        if (!$tierData) {
            printf("Error: %s\n", mysqli_error($this->conn));
            exit();
        }
        $count = 0;
        while($row = mysqli_fetch_array($tierData)){
            $metrics = json_decode($row['metrics'], TRUE);
//            var_dump($metrics);
            if(isset($metrics[$role][$metric][$delta]) || $delta == "game"){
                if($delta != "game"){
                    $metricValue = $metrics[$role][$metric][$delta];
                }
                if($delta == "game"){
                    if (!isset($metrics[$role][$metric]['zeroToTen'])){
                        $metrics[$role][$metric]['zeroToTen'] = 0;
                    }
                    if (!isset($metrics[$role][$metric]['tenToTwenty'])){
                        $metrics[$role][$metric]['tenToTwenty'] = 0;
                    }
                    if (!isset($metrics[$role][$metric]['twentyToThirty'])){
                        $metrics[$role][$metric]['twentyToThirty'] = 0;
                    }
                    if (!isset($metrics[$role][$metric]['thirtyToEnd'])){
                        $metrics[$role][$metric]['thirtyToEnd'] = 0;
                    }
                    $metricValue = $metrics[$role][$metric]['zeroToTen'] + $metrics[$role][$metric]['tenToTwenty'] + $metrics[$role][$metric]['twentyToThirty'] + $metrics[$role][$metric]['thirtyToEnd'];
                    $metricValue = $metricValue / 4;
                }

                if ($metricValue > 0){
                    $count++;
                    array_push($this->averagesStorage, $metricValue);
                }
            }

        }

        if($count > 0){
            $averageAdder = 0;
            for ($i = 0; $i < $count; $i++){
                $averageAdder += $this->averagesStorage[$i];
            }
            $average = $averageAdder / $count;
            $this->averages[strtolower($tier)][$roleName][$idealName] = round($average,2);
        }

    }

    function averageTierBottom($role, $metric, $delta, $roleName, $idealName, $tier){

        $tierData = mysqli_query($this->conn, "SELECT * FROM summoner WHERE player_league='$tier'");

        $this->averagesStorage= [];
        if (!$tierData) {
            printf("Error: %s\n", mysqli_error($this->conn));
            exit();
        }
        $count = 0;
        while($row = mysqli_fetch_array($tierData)){
            $metrics = json_decode($row['metrics'], TRUE);
//            var_dump($metrics);
            if(isset($metrics['BOTTOM'][$role][$metric][$delta])){
                $metricValue = $metrics['BOTTOM'][$role][$metric][$delta];
                if ($metricValue > 0){
                    $count++;
                    array_push($this->averagesStorage, $metricValue);
                }
            }

            if(isset($metrics['BOTTOM'][$role][$metric][$delta]) || $delta == "game"){
                if($delta != "game"){
                    $metricValue = $metrics['BOTTOM'][$role][$metric][$delta];
                }
                if($delta == "game"){
                    if (!isset($metrics['BOTTOM'][$role][$metric]['zeroToTen'])){
                        $metrics['BOTTOM'][$role][$metric]['zeroToTen'] = 0;
                    }
                    if (!isset($metrics['BOTTOM'][$role][$metric]['tenToTwenty'])){
                        $metrics['BOTTOM'][$role][$metric]['tenToTwenty'] = 0;
                    }
                    if (!isset($metrics['BOTTOM'][$role][$metric]['twentyToThirty'])){
                        $metrics['BOTTOM'][$role][$metric]['twentyToThirty'] = 0;
                    }
                    if (!isset($metrics['BOTTOM'][$role][$metric]['thirtyToEnd'])){
                        $metrics['BOTTOM'][$role][$metric]['thirtyToEnd'] = 0;
                    }
                    $metricValue = $metrics['BOTTOM'][$role][$metric]['zeroToTen'] + $metrics['BOTTOM'][$role][$metric]['tenToTwenty'] + $metrics['BOTTOM'][$role][$metric]['twentyToThirty'] + $metrics['BOTTOM'][$role][$metric]['thirtyToEnd'];
                    $metricValue = $metricValue / 4;
                }

                if ($metricValue > 0){
                    $count++;
                    array_push($this->averagesStorage, $metricValue);
                }
            }

        }

        if($count > 0){
            $averageAdder = 0;
            for ($i = 0; $i < $count; $i++){
                $averageAdder += $this->averagesStorage[$i];
            }
            $average = $averageAdder / $count;
            $this->averages[strtolower($tier)][$roleName][$idealName] = round($average,2);
        }

    }


    function saveFile(){
        print_r(json_encode($this->averages, TRUE));
    }

}

$averages = new findAverages($conn);

$tiers = array('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'CHALLENGER');
foreach($tiers as $tier){
    $averages->averageTier('JUNGLE', 'creepsPerMinDeltas', 'zeroToTen', 'jungle', 'csPerMin', $tier);
    $averages->averageTier('JUNGLE', 'xpPerMinDeltas', 'zeroToTen', 'jungle', 'expPerMin', $tier);
    $averages->averageTier('JUNGLE', 'goldPerMinDeltas', 'zeroToTen', 'jungle', 'goldPerMin', $tier);
    $averages->averageTier('JUNGLE', 'stats', 'wardsPlacedPerMin', 'jungle', 'avgWardsplaced', $tier);
    $averages->averageTier('JUNGLE', 'goldPerMinDeltas', 'game', 'jungle', 'goldPerMinPerGame', $tier);
    $averages->averageTier('JUNGLE', 'xpPerMinDeltas', 'game', 'jungle', 'expPerMinPerGame', $tier);

    $averages->averageTier('TOP', 'creepsPerMinDeltas', 'zeroToTen', 'top', 'csPerMin', $tier);
    $averages->averageTier('TOP', 'xpPerMinDeltas', 'zeroToTen', 'top', 'expPerMin', $tier);
    $averages->averageTier('TOP', 'goldPerMinDeltas', 'zeroToTen', 'top', 'goldPerMin', $tier);
    $averages->averageTier('TOP', 'stats', 'wardsPlacedPerMin', 'top', 'avgWardsplaced', $tier);
    $averages->averageTier('TOP', 'goldPerMinDeltas', 'game', 'top', 'goldPerMinPerGame', $tier);
    $averages->averageTier('TOP', 'xpPerMinDeltas', 'game', 'top', 'expPerMinPerGame', $tier);

    $averages->averageTier('MIDDLE', 'creepsPerMinDeltas', 'zeroToTen', 'mid', 'csPerMin', $tier);
    $averages->averageTier('MIDDLE', 'xpPerMinDeltas', 'zeroToTen', 'mid', 'expPerMin', $tier);
    $averages->averageTier('MIDDLE', 'goldPerMinDeltas', 'zeroToTen', 'mid', 'goldPerMin', $tier);
    $averages->averageTier('MIDDLE', 'stats', 'wardsPlacedPerMin', 'mid', 'avgWardsplaced', $tier);
    $averages->averageTier('MIDDLE', 'goldPerMinDeltas', 'game', 'mid', 'goldPerMinPerGame', $tier);
    $averages->averageTier('MIDDLE', 'xpPerMinDeltas', 'game', 'mid', 'expPerMinPerGame', $tier);

    $averages->averageTierBottom('DUO_CARRY', 'creepsPerMinDeltas', 'zeroToTen', 'adc', 'csPerMin', $tier);
    $averages->averageTierBottom('DUO_CARRY', 'xpPerMinDeltas', 'zeroToTen', 'adc', 'expPerMin', $tier);
    $averages->averageTierBottom('DUO_CARRY', 'goldPerMinDeltas', 'zeroToTen', 'adc', 'goldPerMin', $tier);
    $averages->averageTierBottom('DUO_CARRY', 'stats', 'wardsPlacedPerMin', 'adc', 'avgWardsplaced', $tier);
    $averages->averageTierBottom('DUO_CARRY', 'goldPerMinDeltas', 'game', 'adc', 'goldPerMinPerGame', $tier);
    $averages->averageTierBottom('DUO_CARRY', 'xpPerMinDeltas', 'game', 'adc', 'expPerMinPerGame', $tier);

    $averages->averageTierBottom('DUO_SUPPORT', 'creepsPerMinDeltas', 'zeroToTen', 'support', 'csPerMin', $tier);
    $averages->averageTierBottom('DUO_SUPPORT', 'xpPerMinDeltas', 'zeroToTen', 'support', 'expPerMin', $tier);
    $averages->averageTierBottom('DUO_SUPPORT', 'goldPerMinDeltas', 'zeroToTen', 'support', 'goldPerMin', $tier);
    $averages->averageTierBottom('DUO_SUPPORT', 'stats', 'wardsPlacedPerMin', 'support', 'avgWardsplaced', $tier);
    $averages->averageTierBottom('DUO_SUPPORT', 'goldPerMinDeltas', 'game', 'support', 'goldPerMinPerGame', $tier);
    $averages->averageTierBottom('DUO_SUPPORT', 'xpPerMinDeltas', 'game', 'support', 'expPerMinPerGame', $tier);
}

$averages->saveFile();


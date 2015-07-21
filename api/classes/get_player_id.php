<?php
/*
 * @desc    This is the most difficult of all the riot api calls. In order for it to work with foreign languages,
 *          special characters, upper case, lower case and spaces in words it needs to be exact. The name needs to
 *          be moved to lower case and it needs to have spaces removed.
 * @params
 *      $name     -  The username of the player not encoded in any way.
 *      $region   -  The region the player is in
 *
 * @return  This will echo out the returned id of the player, later to be used as a get parameter.
 *
 */

class get_player_id {

    var $name;
    var $region;
    var $api_key = "";

    public function __construct($name_post, $region_post) {

        $this->name = $name_post;
        $this->region = $region_post;

    }

    public function curl_request() {

        $this->name = mb_strtolower($this->name );
        $this->name = str_replace(' ', '', $this->name);

        for ($i = 0; $i < 5; $i++) {

            $ch = curl_init();
            $curlConfig = array(
                CURLOPT_URL => "https://" . $this->region . ".api.pvp.net/api/lol/" . $this->region . "/v1.4/summoner/by-name/" . $this->name . "?api_key=" . $this->api_key,
                CURLOPT_POST => false,
                CURLOPT_RETURNTRANSFER => true,
            );
            curl_setopt_array($ch, $curlConfig);
            $result = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if($httpCode === 200){
                break;
            } else {
                sleep(1);
            }
        }
            $json = json_decode($result, TRUE);

            if (!isset($_COOKIE["recentSearch"])) {

                $cookieValue = $this->name . ",/#/overview/" . $json[$this->name]['id'] . "/" . $this->region;
                setcookie("recentSearch", $cookieValue, time() + (86400 * 30), "/");

            } else if (!isset($_COOKIE["recentSearch2"])) {

                $cookieValue = $this->name . ",/#/overview/" . $json[$this->name]['id'] . "/" . $this->region;
                setcookie("recentSearch2", $cookieValue, time() + (86400 * 30), "/");

            } else if (!isset($_COOKIE["recentSearch3"])) {

                $cookieValue = $this->name . ",/#/overview/" . $json[$this->name]['id'] . "/" . $this->region;
                setcookie("recentSearch3", $cookieValue, time() + (86400 * 30), "/");

            } else if (!isset($_COOKIE["recentSearch4"])) {

                $cookieValue = $this->name . ",/#/overview/" . $json[$this->name]['id'] . "/" . $this->region;
                setcookie("recentSearch4", $cookieValue, time() + (86400 * 30), "/");

            } else if (!isset($_COOKIE["recentSearch5"])) {

                $cookieValue = $this->name . ",/#/overview/" . $json[$this->name]['id'] . "/" . $this->region;
                setcookie("recentSearch5", $cookieValue, time() + (86400 * 30), "/");

            } else {

                $cookieValue = $this->name . ",/#/overview/" . $json[$this->name]['id'] . "/" . $this->region;
                setcookie("recentSearch5", $_COOKIE['recentSearch4'], time() + (86400 * 30), "/");
                setcookie("recentSearch4", $_COOKIE['recentSearch3'], time() + (86400 * 30), "/");
                setcookie("recentSearch3", $_COOKIE['recentSearch2'], time() + (86400 * 30), "/");
                setcookie("recentSearch2", $_COOKIE['recentSearch'], time() + (86400 * 30), "/");
                setcookie("recentSearch", $cookieValue, time() + (86400 * 30), "/");

            }

            return $json[$this->name]['id'];
    }

}



$summonerName = new get_player_id ($_POST['name'], $_POST['region']);
echo $summonerName->curl_request();

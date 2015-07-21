<?php

class recent_search_class {

    var $cookieArray;

    function __construct(){
        $this->cookieArray = array();
    }

    function lookUpCookie(){

        if (isset($_COOKIE["recentSearch"])) {

            $formattedArray = explode(',', $_COOKIE["recentSearch"]);
            array_push($this->cookieArray,
                array(
                    'name' => $formattedArray[0],
                    'url' => $formattedArray[1]
            ));
        }
        if (isset($_COOKIE["recentSearch2"])) {

            $formattedArray = explode(',', $_COOKIE["recentSearch2"]);
            array_push($this->cookieArray,
                array(
                    'name' => $formattedArray[0],
                    'url' => $formattedArray[1]
                ));

        }
        if (isset($_COOKIE["recentSearch3"])) {

            $formattedArray = explode(',', $_COOKIE["recentSearch3"]);
            array_push($this->cookieArray,
                array(
                    'name' => $formattedArray[0],
                    'url' => $formattedArray[1]
                ));

        }
        if (isset($_COOKIE["recentSearch4"])) {

            $formattedArray = explode(',', $_COOKIE["recentSearch4"]);
            array_push($this->cookieArray,
                array(
                    'name' => $formattedArray[0],
                    'url' => $formattedArray[1]
                ));

        }
        if (isset($_COOKIE["recentSearch5"])) {

            $formattedArray = explode(',', $_COOKIE["recentSearch5"]);
            array_push($this->cookieArray,
                array(
                    'name' => $formattedArray[0],
                    'url' => $formattedArray[1]
                ));

        }


        $jsonArray = json_encode($this->cookieArray, TRUE);
        print_r($jsonArray);
    }

}

$cookies = new recent_search_class();
$cookies->lookUpCookie();

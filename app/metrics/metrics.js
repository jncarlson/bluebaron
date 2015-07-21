'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AboutCtrl
 * @description
 * # MetricsCtrl
 * Controller of the angularApp
 */

stat.controller("progressOverTimeController", function ($scope, $http, $rootScope, apiFactory) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getChampion(id, region).then(function(response) {
        $scope.data = response.data;

        $scope.champion1 = response.data.data[1];
        $scope.champion2 = response.data.data[2];
        $scope.champion3 = response.data.data[3];
        $scope.champion4 = response.data.data[4];
        $scope.champion5 = response.data.data[5];
        $scope.champion6 = response.data.data[6];
        $scope.champion7 = response.data.data[7];

        $scope.labels = [$scope.champion1.name, $scope.champion2.name, $scope.champion3.name, $scope.champion4.name, $scope.champion5.name, $scope.champion6.name, $scope.champion7.name];

        $scope.series1 = ["Games Played", 'Wins', 'Losses'];
        $scope.series2 = ["Kills", 'Assists', 'Deaths'];
        $scope.series = ["Games Played", 'Wins', 'Losses'];

        $scope.championGameStats = [
            [$scope.champion1.stats.totalSessionsPlayed, $scope.champion2.stats.totalSessionsPlayed, $scope.champion3.stats.totalSessionsPlayed, $scope.champion4.stats.totalSessionsPlayed, $scope.champion5.stats.totalSessionsPlayed, $scope.champion6.stats.totalSessionsPlayed, $scope.champion7.stats.totalSessionsPlayed],
            [$scope.champion1.stats.totalSessionsWon, $scope.champion2.stats.totalSessionsWon, $scope.champion3.stats.totalSessionsWon, $scope.champion4.stats.totalSessionsWon, $scope.champion5.stats.totalSessionsWon, $scope.champion6.stats.totalSessionsWon, $scope.champion7.stats.totalSessionsWon],
            [$scope.champion1.stats.totalSessionsLost, $scope.champion2.stats.totalSessionsLost, $scope.champion3.stats.totalSessionsLost, $scope.champion4.stats.totalSessionsLost, $scope.champion5.stats.totalSessionsLost, $scope.champion6.stats.totalSessionsLost, $scope.champion7.stats.totalSessionsLost]
        ];

        $scope.championKDA = [
            [$scope.champion1.stats.totalChampionKills, $scope.champion2.stats.totalChampionKills, $scope.champion3.stats.totalChampionKills, $scope.champion4.stats.totalChampionKills, $scope.champion5.stats.totalChampionKills, $scope.champion6.stats.totalChampionKills, $scope.champion7.stats.totalChampionKills],
            [$scope.champion1.stats.totalAssists, $scope.champion2.stats.totalAssists, $scope.champion3.stats.totalAssists, $scope.champion4.stats.totalAssists, $scope.champion5.stats.totalAssists, $scope.champion6.stats.totalAssists, $scope.champion7.stats.totalAssists],
            [$scope.champion1.stats.totalDeathsPerSession, $scope.champion2.stats.totalDeathsPerSession, $scope.champion3.stats.totalDeathsPerSession, $scope.champion4.stats.totalDeathsPerSession, $scope.champion5.stats.totalDeathsPerSession, $scope.champion6.stats.totalDeathsPerSession, $scope.champion7.stats.totalDeathsPerSession]
        ];

        $scope.options = {
            'animation': true
        };

        $scope.selectedItemChanged = function(){

            var index = $("#sortSelectChampionBar")[0].selectedIndex;

            if(index == 1){
                $scope.series = $scope.series1;
            } else if(index == 2){
                $scope.series = $scope.series2;
            }
            $scope.useThisChart = JSON.parse($scope.dataPicker);
        };


        $scope.useThisChart = $scope.championGameStats;

        $scope.colours = [{ // default
            fillColor: "#808080",
            strokeColor: "#808080",
            highlightFill: "#808080",
            highlightStroke: "rgba(220,220,220,1)",
        },
        {
            fillColor: "#39939E",
            strokeColor: "#39939E",
            highlightFill: "#39939E",
            highlightStroke: "rgba(151,187,205,1)",
        },
        {
            fillColor: "#B33030",
            strokeColor: "#B33030",
            highlightFill: "#B33030",
            highlightStroke: "rgba(151,187,205,1)",
        }
        ];

    });


});


stat.controller("metricsController", function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getMetrics(id, region).then(function(response) {
        $scope.data = response.data.data;
        console.log($scope.data);
        setupView();
    });

    function setupView() {
        if (typeof $scope.data.TOP != 'undefined') {
            $('#topTab1').addClass('active');
            $('#toprole1, #toprole11').css('display', 'block');
        } else if (typeof $scope.data.JUNGLE != 'undefined') {
            $('#jungleTab1').addClass('active');
            $('#junglerole1, #junglerole11').css('display', 'block');
        } else if (typeof $scope.data.MIDDLE != 'undefined') {
            $('#midTab1').addClass('active');
            $('#midrole1, #midrole11').css('display', 'block');
        } else if (typeof $scope.data.BOTTOM.DUO_CARRY != 'undefined') {
            $('#adcTab1').addClass('active');
            $('#adcrole1, #adcrole11').css('display', 'block');
        } else if (typeof $scope.data.BOTTOM.DUO_SUPPORT != 'undefined') {
            $('#supportTab1').addClass('active');
            $('#supportrole1, #supportrole11').css('display', 'block');
        }

        $('#topTab1').on('click', function(){
            $('.tabSelect1').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics1').css('display', 'none');
            $('#toprole11, #midrole11, #junglerole11, #adcrole11, #supportrole11').css('display', 'none');
            $('#toprole1, #toprole11').css('display', 'block');
        });
        $('#midTab1').on('click', function(){
            $('.tabSelect1').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics1').css('display', 'none');
            $('#toprole11, #midrole11, #junglerole11, #adcrole11, #supportrole11').css('display', 'none');
            $('#midrole1, #midrole11').css('display', 'block');
        });
        $('#jungleTab1').on('click', function(){
            $('.tabSelect1').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics1').css('display', 'none');
            $('#toprole11, #midrole11, #junglerole11, #adcrole11, #supportrole11').css('display', 'none');
            $('#junglerole1, #junglerole11').css('display', 'block');
        });
        $('#adcTab1').on('click', function(){
            $('.tabSelect1').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics1').css('display', 'none');
            $('#toprole11, #midrole11, #junglerole11, #adcrole11, #supportrole11').css('display', 'none');
            $('#adcrole1, #adcrole11').css('display', 'block');
        });
        $('#supportTab1').on('click', function(){
            $('.tabSelect1').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics1').css('display', 'none');
            $('#toprole11, #midrole11, #junglerole11, #adcrole11, #supportrole11').css('display', 'none');
            $('#supportrole1, #supportrole11').css('display', 'block');
        });
    }

    apiFactory.getIdeals(id, region).then(function(response) {
        $scope.ideals = response.data.data;

        $scope.getIdeal = function(){
            $scope.ideal = $scope.ideals[$scope.tierPicker];
        };

        $scope.tierPicker = $rootScope.mainTier.toLowerCase();;
        $scope.getIdeal();
    });
});



stat.controller("metricsTeamController", function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getTeamData(id, region).then(function(response) {
        $scope.data = response.data.data;
    });

});

stat.controller("metricsOverTimeLineController", function ($scope, $http, $rootScope, apiFactory) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getRankedHistory(id, region).then(function(response) {

        $scope.received = response.data.data;

        $scope.labels = [$scope.received[0].champion,
            $scope.received[1].champion,
            $scope.received[2].champion,
            $scope.received[3].champion,
            $scope.received[4].champion,
            $scope.received[5].champion,
            $scope.received[6].champion,
            $scope.received[7].champion,
            $scope.received[8].champion,
            $scope.received[9].champion,
            $scope.received[10].champion,
            $scope.received[11].champion,
            $scope.received[12].champion,
            $scope.received[13].champion,
            $scope.received[14].champion];

        $scope.series1 = ['Damage Dealt to Champion', 'Damage Taken'];
        $scope.series2 = ['Match Duration', 'Champion Level'];
        $scope.series3 = ['Wards Placed per minute', 'Wards Killed per minute'];
        $scope.series4 = ['Minion Kills per Minute', 'Jungle Minion Kills per Minute'];
        $scope.series5 = ['Gold Earned per Minute', 'Match Duration'];
        $scope.series6 = ['Heal per Minute', 'Crowd Control dealt per minute'];


        $scope.series = $scope.series1;


        $scope.colours =  [{
                fillColor: "rgba(30,136,229, .1)",
                strokeColor: "rgba(30,136,229,1)",
                pointColor: "rgba(30,136,229, 1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)"
            },
            {
                fillColor: "rgba(247,70,74,0.1)",
                strokeColor: "rgba(247,70,74,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)"
            }
        ];

        //function createGraph
        //
        //for (var i = 0; i < $scope.received.length; i++){
        //
        //}

        var gameDur = [];
        var champLvl = [];
        var wardsPlaced = [];
        var wardsKilled = [];
        var damageDealt = [];
        var damageTaken = [];
        var minionKills = [];
        var neutralMinion = [];
        var goldEarned = [];
        var totalHeal = [];
        var crowdControl = [];

        for (var i = 0; i < $scope.received.length; i++){
            gameDur.push(Math.round($scope.received[i].matchDuration / 60));
            champLvl.push($scope.received[i].stats.champLevel);
            wardsPlaced.push($scope.received[i].stats.wardsPlaced / ($scope.received[i].matchDuration / 60));
            wardsKilled.push($scope.received[i].stats.wardsKilled / ($scope.received[i].matchDuration / 60));
            damageDealt.push($scope.received[i].stats.totalDamageDealtToChampions);
            damageTaken.push($scope.received[i].stats.totalDamageTaken);
            minionKills.push($scope.received[i].stats.minionsKilled / ($scope.received[i].matchDuration / 60));
            neutralMinion.push($scope.received[i].stats.neutralMinionsKilled / ($scope.received[i].matchDuration / 60));
            goldEarned.push($scope.received[i].stats.goldEarned / ($scope.received[i].matchDuration / 60));
            totalHeal.push($scope.received[i].stats.totalHeal / ($scope.received[i].matchDuration / 60));
            crowdControl.push($scope.received[i].stats.totalTimeCrowdControlDealt / ($scope.received[i].matchDuration / 60));
        }

        $scope.gameDuration = [
            gameDur,
            champLvl
        ];
        $scope.gameVisibility = [
            wardsPlaced,
            wardsKilled
        ];
        $scope.damageDealings = [
            damageDealt,
            damageTaken
        ];
        $scope.minionKills = [
            minionKills,
            neutralMinion
        ];
        $scope.goldEarned = [
            goldEarned,
            gameDur
        ];
        $scope.crowdControl = [
            totalHeal,
            crowdControl
        ];
        $scope.options = {
            'animation': true,
            scaleGridLineColor : "rgba(255,255,255,.08)"
        };

        $scope.useThisChart = $scope.damageDealings;
        $scope.selectedItemChanged = function(){

            $scope.useThisChart = JSON.parse($scope.dataPicker);

            var index = $("#sortSelectProgressGraph")[0].selectedIndex;

            if(index == 1){
                $scope.series = $scope.series1;
            } else if(index == 2){
                $scope.series = $scope.series2;
            } else if(index == 3){
                $scope.series = $scope.series3;
            } else if(index == 4){
                $scope.series = $scope.series4;
            } else if(index == 5){
                $scope.series = $scope.series5;
            } else if(index == 6){
                $scope.series = $scope.series6;
            }


        };



    });


});


stat.controller("killsController", function ($scope, $http, $rootScope, apiFactory) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getRankedHistory(id, region).then(function(response) {
        $scope.received = response.data.data;

        $scope.labels = [
            $scope.received[0].champion,
            $scope.received[1].champion,
            $scope.received[2].champion,
            $scope.received[3].champion,
            $scope.received[4].champion,
            $scope.received[5].champion,
            $scope.received[6].champion,
            $scope.received[7].champion,
            $scope.received[8].champion,
            $scope.received[9].champion,
            $scope.received[10].champion,
            $scope.received[11].champion,
            $scope.received[12].champion,
            $scope.received[13].champion,
            $scope.received[14].champion];

        $scope.series = ['Kills', 'Assists', 'Deaths'];

        $scope.killsAndDeaths = [
            [   $scope.received[0].stats.kills,
                $scope.received[1].stats.kills,
                $scope.received[2].stats.kills,
                $scope.received[3].stats.kills,
                $scope.received[4].stats.kills,
                $scope.received[5].stats.kills,
                $scope.received[6].stats.kills,
                $scope.received[7].stats.kills,
                $scope.received[8].stats.kills,
                $scope.received[9].stats.kills,
                $scope.received[10].stats.kills,
                $scope.received[11].stats.kills,
                $scope.received[12].stats.kills,
                $scope.received[13].stats.kills,
                $scope.received[14].stats.kills
            ],
            [$scope.received[0].stats.assists,
                $scope.received[1].stats.assists,
                $scope.received[2].stats.assists,
                $scope.received[3].stats.assists,
                $scope.received[4].stats.assists,
                $scope.received[5].stats.assists,
                $scope.received[6].stats.assists,
                $scope.received[7].stats.assists,
                $scope.received[8].stats.assists,
                $scope.received[9].stats.assists,
                $scope.received[10].stats.assists,
                $scope.received[11].stats.assists,
                $scope.received[12].stats.assists,
                $scope.received[13].stats.assists,
                $scope.received[14].stats.assists
            ],
            [$scope.received[0].stats.deaths,
                $scope.received[1].stats.deaths,
                $scope.received[2].stats.deaths,
                $scope.received[3].stats.deaths,
                $scope.received[4].stats.deaths,
                $scope.received[5].stats.deaths,
                $scope.received[6].stats.deaths,
                $scope.received[7].stats.deaths,
                $scope.received[8].stats.deaths,
                $scope.received[9].stats.deaths,
                $scope.received[10].stats.deaths,
                $scope.received[11].stats.deaths,
                $scope.received[12].stats.deaths,
                $scope.received[13].stats.deaths,
                $scope.received[14].stats.deaths
            ]
        ];

        $scope.options = {
            'animation': true,
            scaleGridLineColor : "rgba(255,255,255,.08)"
        };

        $scope.useThisChart = $scope.killsAndDeaths;
        $scope.selectedItemChanged = function(){
            $scope.useThisChart = JSON.parse($scope.dataPicker);
        };



    });


});



stat.controller("graphToShow", function ($scope, $http, $rootScope) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    $scope.graphToShow = '';

    $scope.showGraph = function(param){
        $scope.graphToShow = param;
    }

});

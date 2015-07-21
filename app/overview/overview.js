'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SummaryController
 * @description
 * # OverviewCtrl
 * Controller of the angularApp
 */

var stat = angular.module('angularApp');


stat.controller("favoriteChampionController", function($scope, $rootScope, $http, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getChampion(id, region).then(function(response) {
        //console.log(response.data.data[1]);
        $scope.data = response.data.data[1];
    });

});

stat.controller("metricsChampionController", function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getIdeals(id, region).then(function(response) {
        $scope.ideals = response.data.data;


        $scope.ideal = $scope.ideals[$rootScope.mainTier.toLowerCase()];

    });

    apiFactory.getMetrics(id, region).then(function(response) {
        $scope.data = response.data.data;

        if (typeof $scope.data.TOP != 'undefined'){
            $('#topTab').addClass('active');
            $('#toprole').css('display', 'block');
        } else if (typeof $scope.data.JUNGLE != 'undefined'){
            $('#jungleTab').addClass('active');
            $('#junglerole').css('display', 'block');
        } else if (typeof $scope.data.MIDDLE != 'undefined'){
            $('#midTab').addClass('active');
            $('#midrole').css('display', 'block');
        } else if (typeof $scope.data.BOTTOM.DUO_CARRY != 'undefined') {
            $('#adcTab').addClass('active');
            $('#adcrole').css('display', 'block');
        } else if (typeof $scope.data.BOTTOM.DUO_SUPPORT != 'undefined'){
            $('#supportTab').addClass('active');
            $('#supportrole').css('display', 'block');
        }

        $('#topTab').on('click', function(){
            $('.tabSelect').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics').css('display', 'none');
            $('#toprole').css('display', 'block');
        });
        $('#midTab').on('click', function(){
            $('.tabSelect').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics').css('display', 'none');
            $('#midrole').css('display', 'block');
        });
        $('#jungleTab').on('click', function(){
            $('.tabSelect').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics').css('display', 'none');
            $('#junglerole').css('display', 'block');
        });
        $('#adcTab').on('click', function(){
            $('.tabSelect').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics').css('display', 'none');
            $('#adcrole').css('display', 'block');
        });
        $('#supportTab').on('click', function(){
            $('.tabSelect').removeClass('active');
            $(this).addClass('active');
            $('.tableMetrics').css('display', 'none');
            $('#supportrole').css('display', 'block');
        });
    });
});

stat.controller("rankedHistoryChampionController", function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getRankedHistory(id, region).then(function(response) {

        $scope.data = response.data.data;
    });

});


stat.controller("smallBarController", function ($scope, $http, $rootScope, apiFactory) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getChampion(id, region).then(function(response) {
        //console.log(response.data);
        $scope.data = response.data;

        $scope.champion1 = response.data.data[1];
        $scope.champion2 = response.data.data[2];
        $scope.champion3 = response.data.data[3];
        $scope.champion4 = response.data.data[4];
        $scope.champion5 = response.data.data[5];

        $scope.labels = [$scope.champion1.name.substr(0,5), $scope.champion2.name.substr(0,5), $scope.champion3.name.substr(0,5), $scope.champion4.name.substr(0,5), $scope.champion5.name.substr(0,5)];
        $scope.series = ["KDA"];

        $scope.KDA1 = $scope.champion1.stats.totalChampionKills + $scope.champion1.stats.totalAssists;
        $scope.KDA1 = $scope.KDA1 / $scope.champion1.stats.totalDeathsPerSession;

        $scope.KDA2 = $scope.champion2.stats.totalChampionKills + $scope.champion2.stats.totalAssists;
        $scope.KDA2 = $scope.KDA2 / $scope.champion2.stats.totalDeathsPerSession;

        $scope.KDA3 = $scope.champion3.stats.totalChampionKills + $scope.champion3.stats.totalAssists;
        $scope.KDA3 = $scope.KDA3 / $scope.champion3.stats.totalDeathsPerSession;

        $scope.KDA4 = $scope.champion4.stats.totalChampionKills + $scope.champion4.stats.totalAssists;
        $scope.KDA4 = $scope.KDA4 / $scope.champion4.stats.totalDeathsPerSession;

        $scope.KDA5 = $scope.champion5.stats.totalChampionKills + $scope.champion5.stats.totalAssists;
        $scope.KDA5 = $scope.KDA5 / $scope.champion5.stats.totalDeathsPerSession;

        $scope.data = [
            [Math.round(10 * $scope.KDA1) / 10, Math.round(10 * $scope.KDA2) / 10, Math.round(10 * $scope.KDA3) / 10, Math.round(10 * $scope.KDA4) / 10, Math.round(10 * $scope.KDA5) / 10]
        ];

        $scope.colours = [{ // default
                fillColor: "#B33030",
                strokeColor: "#B33030",
                highlightFill: "#B33030",
                highlightStroke: "rgba(151,187,205,1)",
            }
        ];

    });

});



stat.controller("BarController", function ($scope, $http, $rootScope, apiFactory) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getChampion(id, region).then(function(response) {
        //console.log(response.data);
        $scope.data = response.data;

        $scope.champion1 = response.data.data[1];
        $scope.champion2 = response.data.data[2];
        $scope.champion3 = response.data.data[3];
        $scope.champion4 = response.data.data[4];
        $scope.champion5 = response.data.data[5];

        $scope.labels = [$scope.champion1.name, $scope.champion2.name, $scope.champion3.name, $scope.champion4.name, $scope.champion5.name];
        $scope.series = ["Games Played", 'Wins', 'Losses'];

        $scope.data = [
            [$scope.champion1.stats.totalSessionsPlayed, $scope.champion2.stats.totalSessionsPlayed, $scope.champion3.stats.totalSessionsPlayed, $scope.champion4.stats.totalSessionsPlayed, $scope.champion5.stats.totalSessionsPlayed],
            [$scope.champion1.stats.totalSessionsWon, $scope.champion2.stats.totalSessionsWon, $scope.champion3.stats.totalSessionsWon, $scope.champion4.stats.totalSessionsWon, $scope.champion5.stats.totalSessionsWon],
            [$scope.champion1.stats.totalSessionsLost, $scope.champion2.stats.totalSessionsLost, $scope.champion3.stats.totalSessionsLost, $scope.champion4.stats.totalSessionsLost, $scope.champion5.stats.totalSessionsLost]
        ];

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



stat.controller("LineController", function ($scope, $http, $rootScope, apiFactory) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getRankedHistory(id, region).then(function(response) {
        //console.log(response.data.data);
        $scope.received = response.data.data;

        $scope.labels = [$scope.received[6].champion, $scope.received[5].champion, $scope.received[4].champion, $scope.received[3].champion, $scope.received[2].champion, $scope.received[1].champion, $scope.received[0].champion];
        $scope.series = ['Kills', 'Deaths'];
        $scope.data = [
            [$scope.received[6].stats.kills, $scope.received[5].stats.kills, $scope.received[4].stats.kills, $scope.received[3].stats.kills, $scope.received[2].stats.kills, $scope.received[1].stats.kills, $scope.received[0].stats.kills],
            [$scope.received[6].stats.deaths, $scope.received[5].stats.deaths, $scope.received[4].stats.deaths, $scope.received[3].stats.deaths, $scope.received[2].stats.deaths, $scope.received[1].stats.deaths, $scope.received[0].stats.deaths]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
    });


});


stat.controller('sideProfileController', function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getLeague(id, region).then(function(response) {
        console.log(response.data.data[id][0]);
        $scope.data = response.data.data[id][0];

        $scope.division = response.data.data[id][0].division;

        if($scope.division === "I"){
            $scope.division = 1;
        } else if($scope.division === "II"){
            $scope.division = 2;
        } else if($scope.division === "III"){
            $scope.division = 3;
        } else if($scope.division === "IV"){
            $scope.division = 4;
        } else if($scope.division === "V"){
            $scope.division = 5;
        } else if($scope.division === "VI"){
            $scope.division = 6;
        } else if($scope.division === "VII"){
            $scope.division = 7;
        }

    });

    apiFactory.getSummonerName(id, region).then(function(response) {
        console.log("what");
        console.log(response);
        $scope.name = response.data.data;

    });

});

stat.filter('limitFromTo', function(){
    return function(input, from, to){
        return (input != undefined)? input.slice(from, to) : '';
    }
});

stat.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});



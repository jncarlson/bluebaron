'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AboutCtrl
 * @description
 * # LeagueCtrl
 * Controller of the angularApp
 */


stat.controller("leagueController", function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getLeague(id, region).then(function(response) {

        $scope.tier = response.data.data[id][0]['tier'];
        $scope.data = response.data.data[id][0]['entries'];

        var division = response.data.data[id][0]['division'];

        var leagueArray = [];

        for (var i = 0; i < response.data.data[id][0]['entries'].length; i++){

            if (response.data.data[id][0]['entries'][i]['division'] === division){
                leagueArray.push(response.data.data[id][0]['entries'][i])
            }

        }

        $scope.league = leagueArray;
        console.log($scope.league);
    });



});
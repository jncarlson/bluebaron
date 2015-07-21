'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AboutCtrl
 * @description
 * # HistoryCtrl
 * Controller of the angularApp
 */


stat.controller("rankedHistoryController", function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getRankedHistory(id, region).then(function(response) {

        $scope.data = response.data.data;
        console.log($scope.data);

    });

    $scope.orderByThis = '-matchCreation';
    $scope.filterByThis = '';
});



stat.controller("rankedChampionController", function($scope, $rootScope, apiFactory){

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getChampion(id, region).then(function(response) {

        var indexToRemove = 0;
        var numberToRemove = 1;
        response.data.data.splice(indexToRemove, numberToRemove);
        $scope.data = response.data.data;

    });

    apiFactory.getStaticItems(id, region).then(function(response) {

        $scope.items = response.data.data;

    });

    $scope.orderByThis = '-stats.totalSessionsPlayed';
    $scope.limitByThis = '20';
    $scope.filterByThis = '';

});


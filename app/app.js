'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
var bbApp = angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js',
    'ngToast'
  ]);
  bbApp.config(function ($routeProvider) {
    $routeProvider
        .when('/overview/:param1/:param2', {
        templateUrl: 'app/overview/overview.html'
        })
        .when('/metrics/:param1/:param2', {
        templateUrl: 'app/metrics/metrics.html'
        })
        .when('/league/:param1/:param2', {
        templateUrl: 'app/league/league.html'
        })
        .when('/history/:param1/:param2', {
        templateUrl: 'app/history/history.html'
        })
        .when('/rm/:param1/:param2', {
        templateUrl: 'app/rm/rm.html'
        })
        .when('/twitch/:param1/:param2', {
        templateUrl: 'app/twitch/twitch.html'
        })
        .when('/about/:param1/:param2', {
        templateUrl: 'app/about/about.html'
        })
        .when('/about', {
        templateUrl: 'app/about/about.html'
        })
        .when('/', {
        templateUrl: 'app/main/main.html'
        })
        .otherwise("/");
  });


bbApp.factory('apiFactory', function($http, ngToast) {

    return {
        getChampion: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'champion'
            });
        },
        getMetrics: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'metrics'
            });
        },
        getRankedHistory: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'ranked_history'
            });
        },
        getLeague: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'league'
            });
        },
        getTeamData: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'team_data'
            });
        },
        getSummonerName: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'summoner'
            });
        },
        getRunes: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'runes'
            });
        },
        getMasteries: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'masteries'
            });
        },
        getStaticRunes: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'static_rune-map'
            });
        },
        getStaticRuneData: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'static_runes'
            });
        },
        getStaticItems: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'static_items'
            });
        },
        getIdeals: function(id, region) {
            return postRequest({
                id: id,
                region: region,
                partial: 'static_ideals'
            });
        }
    };


    function postRequest(data) {
        return $http.post('api/api-internal.php', data).then(onRequestComplete, onError);
    }

    function onRequestComplete(response){

        if(response.data.status === 200){

            return response;

        } else if (response.data.status === 404) {

            ngToast.create({
                className: 'danger',
                content: '<b>' + response.data.message + '</b> This can be caused by incorrect region or spelling  <a href="" class="">Send Error Report</a>'
            });

        } else if (response.data.status === 503){

            ngToast.create({
                className: 'info',
                content: '<b>' + response.data.message + "</b> Riot's server isn't responding!" + ' <a href="" class="">Send Error Report</a>'
            });

        } else {
            ngToast.create({
                className: 'danger',
                content: '<b>' + response.data.message + ' </b> <a href="" class="">Send Error Report</a>'
            });
        }

    }

    function onError(reason){

        ngToast.create({
            className: 'danger',
            content: 'There was an error with the API call out: </b> <a href="" class="">Send Error Report</a>'
        });

    }

});



bbApp.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);


function cl(param){
    console.log("------");
    console.log(param);
    console.log("------");
}
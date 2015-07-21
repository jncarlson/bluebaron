'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AboutCtrl
 * @description
 * # StaticCtrl
 * Controller of the angularApp
 */
var stat = angular.module('angularApp');

stat.controller('navCtrl', function navCtrl($scope, $location) {

    $scope.navItems = [
        {
            iconClasses: 'fa fa-user glyph-thin-icon',
            cls: 'spoticon-summary-32 standard-menu-item',
            id: 'nav-overview',
            navText: 'Overview',
            ngHref: '#/overview',
            active: ''
        },
        {
            iconClasses: 'fa fa-bar-chart glyph-thin-icon',
            cls: 'spoticon-metrics-32 standard-menu-item',
            id: 'nav-metrics',
            navText: 'Metrics',
            ngHref: '#/metrics',
            active: ''
        },
        {
            iconClasses: 'fa fa-list-ol glyph-thin-icon',
            cls: 'spoticon-league-32 standard-menu-item',
            id: 'nav-league',
            navText: 'League',
            ngHref: '#/league',
            active: ''
        },
        {
            iconClasses: 'fa fa-history glyph-thin-icon',
            cls: 'spoticon-history-32 standard-menu-item',
            id: 'nav-history',
            navText: 'History',
            ngHref: '#/history',
            active: ''
        },
        {
            iconClasses: 'fa fa-sitemap glyph-thin-icon',
            cls: 'spoticon-rm-32 standard-menu-item',
            id: 'nav-rm-history',
            navText: 'R&M',
            ngHref: '#/rm',
            active: ''
        }
        //{
        //    iconClasses: 'fa fa-video-camera glyph-thin-icon',
        //    cls: 'spoticon-twitch-32 standard-menu-item',
        //    id: 'nav-twitch',
        //    navText: 'Twitch',
        //    ngHref: '#/twitch',
        //    active: ''
        //}
    ];

    $scope.checkIfUser = function() {
        return true;
    };



    //$scope.changeActiveItem = function(index) {
    //	for (var i = 0; i < $scope.navItems.length; i++) {
    //		$scope.navItems[i].active = '';
    //	}
    //	$scope.navItems[index].active = 'active';
    //}
    //



    $scope.$on('$routeChangeStart', function(next, current) {
        var path = $location.url();
        path = path.split("/");
        path = path[1];
        $(".navItems").removeClass("active");
        if (path === "overview"){
            $("#nav-overview").addClass("active");
        } else if (path === "metrics"){
            $("#nav-metrics").addClass("active");
        } else if (path === "league"){
            $("#nav-league").addClass("active");
        } else if (path === "history"){
            $("#nav-history").addClass("active");
        } else if (path === "rm"){
            $("#nav-rm-history").addClass("active");
        } else if (path === "twitch"){
            $("#nav-twitch").addClass("active");
        } else if (path === "about"){
            $("#nav-legal").addClass("active");
        }
    });

});



stat.controller('leaguePlayers', function modalSearch($scope, $http, $location, $window, $rootScope, $route, $timeout, ngToast, apiFactory) {


    $scope.update = function(leagueId){

        $scope.$parent.showLoader = false;
        var urlParam = $location.url();
        var startString = urlParam.indexOf("/", 2);
        $rootScope.param = urlParam.substr(startString);
        var urlParams = urlParam.substr(startString + 1);
        var paramVars = urlParams.split("/", 2);

        $rootScope.player_id = paramVars[0];
        $rootScope.region = paramVars[1];

        $scope.$parent.showLoader = true;

        var string = ({
            id: leagueId,
            region: $rootScope.region,
            partial: 'initialize'
        });

        $http({
            method: 'POST',
            url: 'api/api-internal.php?',
            data: string,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
            success(function(response) {
                $scope.$parent.showLoader = false;

                if(response.status !== undefined){

                    if(response.status === 200){

                        $rootScope.param = '/' + response.data.player_id;
                        $rootScope.param2 = "/" + response.data.region;

                        $rootScope.player_id = response.data.player_id;
                        $rootScope.region = response.data.region;


                        var reload = false;
                        if ($route.current.loadedTemplateUrl === '/views/overview.html'){
                            reload = true;
                        }
                        $location.path("overview/" + response.data.player_id + "/" + response.data.region);
                        if(reload === true){
                            $route.reload();

                        }

                    } else if (response.status === 404) {

                        ngToast.create({
                            className: 'danger',
                            content: '<b>' + response.message + '</b> This can be caused by incorrect region or spelling  <a href="" class="">Send Error Report</a>'
                        });

                    } else if (response.status === 503){

                        ngToast.create({
                            className: 'info',
                            content: '<b>' + response.message + "</b> Riot's server isn't responding!" + ' <a href="" class="">Send Error Report</a>'
                        });

                    } else {

                        ngToast.create({
                            className: 'danger',
                            content: '<b>' + response.message + ' </b> <a href="" class="">Send Error Report</a>'
                        });
                        console.log(response);
                    }

                } else{
                    // the server returned gibberish
                }



            }).
            error(function() {
                ngToast.create({
                    className: 'danger',
                    content: 'Call out request failure <a href="" class="">Send Error Report</a>'
                });

            });
    };


});


stat.controller('modalSearch', function modalSearch($scope, $http, $location, $window, $rootScope, $route, $timeout, ngToast, apiFactory) {

    $scope.$parent.showLoader = false;
    var urlParam = $location.url();
    var startString = urlParam.indexOf("/", 2);
    $rootScope.param = urlParam.substr(startString);
    var urlParams = urlParam.substr(startString + 1);
    var paramVars = urlParams.split("/", 2);
    $rootScope.player_id = paramVars[0];
    $rootScope.region = paramVars[1];

    $scope.regions = ["NA", "EUW", "EUNE", "BR", "TR", "RU", "LAN", "LAS", "OCE", "KR"];
    $scope.update = function(my){
        $scope.master = {};
        $scope.master = angular.copy(my);
        $scope.param2 = "/" + my.region;

        $scope.$parent.showLoader = true;

        var string = ({
            id: $scope.master.userName,
            region: $scope.master.region,
            partial: 'initialize'
        });

        $http({
                method: 'POST',
                url: 'api/api-internal.php?',
                data: string,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
            success(function(response) {
                 $scope.$parent.showLoader = false;

                if(response.status !== undefined){

                    if(response.status === 200){

                        $rootScope.param = '/' + response.data.player_id;
                        $rootScope.param2 = "/" + response.data.region;

                        $rootScope.player_id = response.data.player_id;
                        $rootScope.region = response.data.region;


                        var reload = false;
                        if ($route.current.loadedTemplateUrl === '/views/overview.html'){
                            reload = true;
                        }
                        $location.path("overview/" + response.data.player_id + "/" + response.data.region);
                        if(reload === true){
                            $route.reload();

                        }

                    } else if (response.status === 404) {

                        ngToast.create({
                            className: 'danger',
                            content: '<b>' + response.message + '</b> This can be caused by incorrect region or spelling  <a href="" class="">Send Error Report</a>'
                        });

                    } else if (response.status === 503){

                        ngToast.create({
                            className: 'info',
                            content: '<b>' + response.message + "</b> Riot's server isn't responding!" + ' <a href="" class="">Send Error Report</a>'
                        });

                    } else {

                        ngToast.create({
                            className: 'danger',
                            content: '<b>' + response.message + ' </b> <a href="" class="">Send Error Report</a>'
                        });
                        console.log(response);
                    }

                } else{
                    console.log(response);
                    // the server returned gibberish
                }



            }).
            error(function() {
                ngToast.create({
                    className: 'danger',
                    content: 'Call out request failure <a href="" class="">Send Error Report</a>'
                });

            });
    };


});


stat.controller("recentSearchController", function recentSearchController($scope, $http, $location, $rootScope, $window){

    $scope.search = function(url){


        var urlParam = url;
        var startString = urlParam.indexOf("/", 4);
        $rootScope.param = urlParam.substr(startString);

        var urlParams = urlParam.substr(startString + 1);

        var paramVars = urlParams.split("/", 2);

        $rootScope.player_id = paramVars[0];
        $rootScope.region = paramVars[1];
        $('#myModal').modal('hide')


    };


    var onRequestComplete = function(response){
        $scope.items = response.data;
    };

    var onError = function(reason){
        $scope.error = console.log("There was an error recentSearchController api call: " + reason);
    };

    $http.get('api/classes/recent_search_class.php')
        .then(onRequestComplete, onError);

    $scope.update = function(account){
        var address = account.substring(3);
        $location.path(address);
    }

});


stat.config(['ngToastProvider', function(ngToastProvider) {
    ngToastProvider.configure({
        animation: 'slide', // or 'fade'
        timeout: 8000,
        horizontalPosition: 'center'
    });
}]);


stat.controller('sideProfileController', function($scope, $rootScope, apiFactory){

    $scope.$on('$routeChangeStart', function(next, current) {

        var id = $rootScope.player_id;
        var region = $rootScope.region;
        var stringId = id.toString();
        if (stringId.length > 2){

            apiFactory.getLeague(id, region).then(function(response) {
                $scope.data = response.data.data[id][0];
                $rootScope.mainTier = $scope.data["tier"];
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
                $scope.name = response.data.data;
            });
        }
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


stat.controller("updateButtonController", function recentSearchController($scope, $http, $location, $rootScope, $route, ngToast){


    $scope.updateSummoner = function(){

        var id = $rootScope.player_id;
        var region = $rootScope.region;

        var string = ({
            id: id,
            region: region,
            partial: 'initialize',
            update: 'true'
        });

        $scope.refreshing = true;
        $http({
            method: 'POST',
            url: 'api/api-internal.php?',
            data: string,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
        success(function(response) {

            if(response.status === 200) {
                $route.reload();
                ngToast.create({
                    className: 'success',
                    content: 'Summoner Information Updated'
                });
            }

            if(response.status === 666){
                ngToast.create({
                    className: 'info',
                    content: response.message
                });
            }
            $scope.refreshing = false;
        }).
        error(function() {
            ngToast.create({
                className: 'danger',
                content: 'Call out request failure <a href="" class="">Send Error Report</a>'
            });
            $scope.refreshing = false;
        });
    }
});
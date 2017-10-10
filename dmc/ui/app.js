/**
 * Created by U160964 on 10/9/2017.
 */
angular.module('dmcviews', []);
angular.module('app.dmc', ['ngRoute', 'ngMessages', 'ngAnimate', 'dmcviews', 'jlareau.pnotify'])
    .constant('Urls', {
        'getErdData':'/data/erd.json'
    })
    .config([ '$locationProvider', '$routeProvider',

        function( $locationProvider, $routeProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/login', {
                    template: '<login-splash></login-splash>'
                })
                .when('/dashboard', {
                    template: '<dashboard></dashboard>'
                })
                .when('/datamodel', {
                    template: '<datamodel></datamodel>'
                })
                .otherwise({redirectTo: '/dashboard'});
        }])
    .controller('AppController',['$scope', '$location', function($scope, $location){

        $scope.users = [];
        $scope.$on('$routeChangeStart', function(event, next, current) {
            $scope.$broadcast("clearPopups");
        });

    }]);



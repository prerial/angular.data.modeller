angular.module('dmcviews', []);
angular.module('dmc.directives', []);
angular.module('app.dmc', ['ngRoute', 'ngMessages', 'ngAnimate', 'dmc.directives', 'dmcviews', 'nvd3', 'jlareau.pnotify'])
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
                .when('/target', {
                    template: '<target-schema></target-schema>'
                })
                .when('/source', {
                    template: '<source-schema></source-schema>'
                })

                .otherwise({redirectTo: '/dashboard'});
        }])
    .controller('AppController',['$scope', '$location', function($scope, $location){

        $scope.users = [];
        $scope.$on('$routeChangeStart', function(event, next, current) {
            $scope.$broadcast("clearPopups");
        });

    }]);



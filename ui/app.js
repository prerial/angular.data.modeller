angular.module('dmcviews', []);
angular.module('dmc.directives', []);
angular.module('app.dmc', ['ngRoute', 'ngMessages', 'ngAnimate', 'nvd3', 'dmc.directives', 'dmcviews', 'jlareau.pnotify'])
    .constant('Urls', {
        'getErdData': angular.testmode? 'data/erd.json' : 'http://localhost:5000/dmc/v1.0/schemas'
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
                .otherwise({redirectTo: '/login'});
        }])
    .controller('AppController',['$scope', '$location', 'Urls', function($scope, $location){

        $scope.isLogon = false;
        $scope.users = [];
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
        $scope.$on('authenticated', function() {
            $scope.isLogon = true;
        });
        $scope.$on('$routeChangeStart', function(event, next, current) {
            if(next.$$route && next.$$route.originalPath === '/login' && $scope.isLogon){
                $scope.isLogon = false;
            }
            $scope.$broadcast("clearPopups");
        });


    }]);



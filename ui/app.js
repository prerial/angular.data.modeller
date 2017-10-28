angular.module('dmcviews', []);
angular.module('dmc.utils', []);
angular.module('dmc.directives', []);
angular.module('app.dmc', ['ngRoute', 'ngMessages', 'ngAnimate', 'dmc.directives', 'dmc.utils', 'dmcviews', 'jlareau.pnotify'])
    .constant('Urls', {
        'getDashboardGridData': angular.testmode? 'data/erd.json' : 'http://localhost:5000/dmc/v1.0/schemas',
        'getErdData': angular.testmode? 'data/erd.json' : 'http://localhost:5000/dmc/v1.0/schemas/schema_id',
        'getErdAnchorData': angular.testmode? 'data/denorm_json_ddl_dml.json' : 'http://localhost:5000/dmc/v1.0/schemas/denorm'
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
                .when('/anchormodel', {
                    template: '<anchormodel></anchormodel>'
                })
                .when('/source', {
                    template: '<source-schema></source-schema>'
                })
                .otherwise({redirectTo: '/login'});
        }])
    .controller('AppController',['$scope', '$location', function($scope, $location){

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



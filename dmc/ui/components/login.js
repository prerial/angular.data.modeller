/**
 * Created by U160964 on 5/16/2017.
 */
(function() {
    "use strict";

    angular.module('app.dmc').component('loginSplash', {
        templateUrl: 'dmc/ui/views/loginAdminView.html',
        controller: 'LoginController'

    });
    angular.module('app.dmc').controller('LoginController', ['$scope', '$location', '$timeout', 'notificationService', 'LoginService',
          function($scope, $location, $timeout, notificationService, loginService) {

              $scope.formSubmit = function() {
                  $scope.expired = false;
                  if(loginService.login($scope.username, $scope.password)) {
                      $scope.error = '';
                      $scope.username = '';
                      $scope.password = '';
                      $location.url('/dashboard');
                  } else {
                      $timeout(function() { $scope.expired = true; }, 5000);
                      notificationService.error('Incorrect username/password!');
                  }
              };

              $scope.addAlert = function() {
                  $scope.alerts.push({msg: 'Another alert!'});
              };

              $scope.closeAlert = function(index) {
                  $scope.alerts.splice(index, 1);
              };
        }]);

})();

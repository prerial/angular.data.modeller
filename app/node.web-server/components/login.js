(function() {
    "use strict";

    angular.module('app.dmc').component('loginSplash', {
        templateUrl: 'node.web-server/views/loginAdminView.html',
        controller: 'LoginController'

    });
    angular.module('app.dmc').controller('LoginController', ['$scope','$rootScope', '$location', '$timeout', 'notificationService', 'LoginService', 'CommonRequestService',
          function($scope, $rootScope, $location, $timeout, notificationService, loginService, commonRequestService) {

              $scope.formSubmit = function() {
                  var form = {
                      username: "admin",
                      password: "admin"
                  };
                  $scope.expired = false;
            var data = {'requestType': 'login', 'data': form};
debugger;
            commonRequestService.postRequestData(data)
//            commonRequestService.getRequestDataQueryString(data)
                .then(function(resp){
//                    self.resetAnchorsForm();
//                    var erData = resp.data.payload;
debugger
                }).catch( function(msg){
                    debugger
/*
                    $timeout(function() { $scope.expired = true; }, 5000);
                    notification.error('Error: ' + msg.responseText);
                    utilsService.hideSpinner();
*/
            });
/*
                  if(loginService.login($scope.username, $scope.password)) {
                      $rootScope.$broadcast('authenticated');
                      $scope.error = '';
                      $scope.username = '';
                      $scope.password = '';
                      $location.url('/dashboard');
                  } else {
                      $timeout(function() { $scope.expired = true; }, 5000);
                      notificationService.error('Incorrect username/password!');
                  }
*/
              };

        }]);

})();

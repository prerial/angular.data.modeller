/**
 * Created by U160964 on 5/16/2017.
 */
(function() {
    "use strict";

    angular.module('app.dmc').component('datamodel', {
        templateUrl: 'dmc/ui/views/dataModelView.html',
        controller: 'DataModelController'

    });
    angular.module('app.dmc').controller('DataModelController', ['$scope', '$location', '$timeout', 'notificationService', 'Urls', 'CommonRequestService', 'GraphService',
        function($scope, $location, $timeout, notification, urls, commonRequestService, graphService) {

            var data = {'requestType': 'getErdData'};
            commonRequestService.getRequestData(data)
                .then(function(resp){
                    var erData = resp.data.result;
                    $timeout(function(){
                        graphService.buildGraph(erData)
                    },200);
            }).catch( function(msg){
                $timeout(function() { $scope.expired = true; }, 5000);
                notification.error('Error: ' + msg.responseText);
            });

        }]);

})();

(function() {
    "use strict";

    angular.module('app.dmc').component('datamodel', {
        templateUrl: 'ui/views/dataModelView.html',
        controller: 'DataModelController'

    });
    angular.module('app.dmc').controller('DataModelController', ['$scope', '$location', '$timeout', 'notificationService', 'Urls', 'messageService', 'CommonRequestService', 'GraphService',
        function($scope, $location, $timeout, notification, urls, messageService, commonRequestService, graphService) {

            var formdata = messageService.getMessage();
            var data = {'requestType': 'getErdData', 'data': formdata.data};
            commonRequestService.getRequestData(data)
                .then(function(resp){
                    var erData = resp.data.result;
                    $timeout(function(){
                        graphService.buildGraph(erData)
                    },500);
            }).catch( function(msg){
                $timeout(function() { $scope.expired = true; }, 5000);
                notification.error('Error: ' + msg.responseText);
            });

        }]);

})();

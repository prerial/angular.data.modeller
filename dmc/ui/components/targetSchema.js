(function() {
    "use strict";

    angular.module('app.dmc').component('targetSchema', {
        templateUrl: 'dmc/ui/views/targetSchemaView.html',
        controller: 'TargetSchemaController'

    });
    angular.module('app.dmc').controller('TargetSchemaController', ['$scope', '$location', '$timeout', 'notificationService', 'Urls', 'CommonRequestService', 'GraphService',
        function($scope, $location, $timeout, notification, urls, commonRequestService, graphService) {
//debugger

        }]);

})();

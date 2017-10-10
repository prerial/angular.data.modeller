(function() {
    "use strict";

    angular.module('app.dmc').component('sourceSchema', {
        templateUrl: 'dmc/ui/views/sourceSchemaView.html',
        controller: 'SourceSchemaController'

    });
    angular.module('app.dmc').controller('SourceSchemaController', ['$scope', '$location', '$timeout', 'notificationService', 'Urls', 'CommonRequestService', 'GraphService',
        function($scope, $location, $timeout, notification, urls, commonRequestService, graphService) {
//debugger

        }]);

})();

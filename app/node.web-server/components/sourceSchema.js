(function() {
    "use strict";

    angular.module('app.dmc').component('sourceSchema', {
        templateUrl: 'node.web-server/views/sourceSchemaView.html',
        controller: 'SourceSchemaController'

    });
    angular.module('app.dmc').controller('SourceSchemaController', ['$scope', '$location', '$timeout', 'messageService',
        function($scope, $location, $timeout, messageService) {

            this.submitForm = function(formdata){
                formdata.single = sourceSchemaForm.single.value;
                messageService.addMessage(formdata);
                $location.path('/datamodel');
            }

        }]);
})();

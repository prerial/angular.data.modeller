(function() {
    "use strict";

    angular.module('app.dmc').factory('messageService', function ($rootScope) {
        return {
            messages: [],
            identity: 0,
            getMessage: function() {

                var data = this.messages[0];
                this.messages = [];
                return data;
            },
            addMessage: function(obj, caller) {

                this.identity += 1;
                var id = this.identity,
                    message = {
                        id: id,
                        data: obj,
                        source: caller
                    };

                this.messages.push(message);
                $rootScope.$broadcast('messageAdded');
            }
        };
    });
})();


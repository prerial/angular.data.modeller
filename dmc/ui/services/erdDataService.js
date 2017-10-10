(function() {
    "use strict";

    angular.module('app.dmc').factory('erdDataService', function ($rootScope) {
        var messenger = {
            messages: [],
            identity: 0,
            addMessage: function (text, caller) {

                this.identity += 1;
                var id = this.identity,
                    message = {
                        text: caller + text,
                        id: id
                    };

                this.messages.push(message);
                $rootScope.$broadcast('messageAdded');
            }
        };

        return messenger;
    });

})();

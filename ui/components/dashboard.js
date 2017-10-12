(function() {
    "use strict";

    angular.module('app.dmc').component('dashboard', {
        templateUrl: 'ui/views/dashboardView.html',
        controller: 'DashboardController'

    });
    angular.module('app.dmc').controller('DashboardController', ['$scope', '$location', '$timeout',
        function($scope, $location, $timeout) {

            var self = this;
            this.title = 'Dashboard View';

            this.names = [
                {name: 'mysql_northwind', description: 'MySQL - NorthWind Example', type: 'Database', database: 'MySQL' , schema: 'northwind'  },
                {name: 'mysql_daf', description: 'MySQL - DAF Physical Model', type: 'Database' , database: 'MySQL' , schema: 'daf'  },
                {name: 'oracle_dmc',  description: 'Oracle - NorthWind Example',  type: 'Database' , database: 'Oracle' , schema: 'dmc'   },
                {name: 'teradata_icdw', description: 'ICDW Data Model', type: 'Database' , database: 'Teradata' , schema: 'ICDW'  },
                {name: 'teradata_icdw', description: 'ICDW Data Model',  type:  'Erwin Import' , database: 'Teradata' , schema: 'ICDW' }
            ];

            $scope.formSubmit = function() {
            };

        }]);
})();

(function(){
    "use strict";

    angular.module('app.dmc').factory('CommonRequestService', ['$rootScope', '$q', '$http', 'Urls',
        function($rootScope, $q, $http, Urls) {

            return {
                getRequestDataByID: getRequestDataByID,
                postRequestData: postRequestData,
                getRequestData: getRequestData
            };
            function httpPost(url, request){
                var deferred = $q.defer();
                if(url){
                    $http.post(url, request)
                        .then(function (data) {
                            deferred.resolve(data);
                        })
                        .catch(function (msg) {
                            $rootScope.$broadcast('error:server', msg);
                            deferred.reject(msg);
                        });

                }else{
                    deferred.reject({'responseText':'REST url error'});

                }
                return deferred.promise;
            }
            function httpGet(url){
                var deferred = $q.defer();
                if(url){
                    $http.get(url)
                    .then(function (data) {
                        deferred.resolve(data);
                    })
                    .catch(function (msg, a, b, c) {
                        $rootScope.$broadcast('error:server', msg);
                        deferred.reject(msg);
                    });
                }else{
                        deferred.reject({'responseText':'REST url error'});
                }
                return deferred.promise;
            }
            function postRequestData(data){
                return httpPost(Urls[data.requestType], data);
            }
            function getRequestData(data){
                return httpGet(Urls[data.requestType], data);
            }
            function getRequestDataByID(url){
                return httpGet(url);
            }
        }]);
})();
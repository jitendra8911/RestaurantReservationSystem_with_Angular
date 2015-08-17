(function () {
        'use strict';
        angular.module('restaurantReservationSystem')
            .service('logoutService', logoutServiceFn);

        logoutServiceFn.$inject = ['$q', '$http'];
        function logoutServiceFn($q, $http) {
            var self = this;
            self.logout = function () {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: 'api/session/logout',
                })
                    .success(function (data) {
                        defer.resolve(data);
                    })
                    .error(function (err) {
                        defer.reject(err);
                    });

                return defer.promise;
            };
        }
    })()
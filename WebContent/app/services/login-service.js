(function () {
        'use strict';
        angular.module('restaurantReservationSystem')
            .service('loginService', loginServiceFn);

        loginServiceFn.$inject = ['$q', '$http'];
        function loginServiceFn($q, $http) {
            var self = this;
            self.authenticateUser = function (adminDetails) {
                var defer = $q.defer();

                $http({
                    method: 'POST',
                    url: 'api/admin/authenticate',
                    data: adminDetails
                })
                    .success(function (data) {
                        defer.resolve(data);
                    })
                    .error(function (err) {
                        defer.reject(err);
                    });

                return defer.promise;
            };

            self.checkLogin = function () {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: 'api/session/checkLogin',
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
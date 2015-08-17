(function () {

    'use strict';
    angular.module('restaurantReservationSystem')
        .service('customerService', customerServiceFn);

    customerServiceFn.$inject = ['$q', '$http'];
    function customerServiceFn($q, $http) {
        var self = this;
        self.resreveTable = function (bookingDetails) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: 'api/customer/reserveTable',
                data: bookingDetails
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.updateReservation = function (bookingDetails) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: 'api/customer/updateReservation',
                data: bookingDetails
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.cancelReservation = function (confirmationCode) {
            var defer = $q.defer();
            console.log('confirmationCode is ' + confirmationCode)
            $http({
                method: 'GET',
                url: 'api/customer/cancelReservation/' + confirmationCode,
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.getRestaurantDetails = function () {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/customer/getRestaurantDetails',
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
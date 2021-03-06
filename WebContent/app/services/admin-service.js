(function () {
    'use strict';
    angular.module('restaurantReservationSystem').service('adminService',
        adminServiceFn);

    adminServiceFn.$inject = ['$q', '$http'];
    function adminServiceFn($q, $http) {
        var self = this;
        self.viewSeatingArea = function () {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/admin/viewSeatingArea'
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;

        }


        self.viewReservationDetails = function (confirmationCode) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/admin/viewReservationDetails/' + confirmationCode
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.viewReservationsList = function () {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/admin/viewReservationsList'
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.viewVacantTables = function (partyTime) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/admin/viewVacantTables/' + partyTime
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.changeAssignTable = function (confirmationCode, tableId) {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/admin/changeAssignTable/' + confirmationCode + '/' + tableId
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.viewContacts = function () {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/admin/viewContacts'
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.viewPastReservations = function (telephone) {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'api/admin/viewPastReservations/' + telephone
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.updateRestaurantProfile = function (restaurantData) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: 'api/admin/updateRestaurantProfile',
                data: restaurantData
            })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };


        self.updateRestaurantWebSettings = function (restaurantData) {
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: 'api/admin/updateRestaurantWebSettings',
                data: restaurantData
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
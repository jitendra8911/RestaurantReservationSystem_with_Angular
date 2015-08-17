(function () {
    angular.module('restaurantReservationSystem')
        .controller('ViewPastReservationsCtrl', ViewPastReservationsCtrlFn);

    ViewPastReservationsCtrlFn.$inject = ['adminService', '$routeParams']
    function ViewPastReservationsCtrlFn(adminService, $routeParams) {
        var viewPastReservationsVm = this;
        adminService.viewPastReservations($routeParams.telephone).then(function (data) {
            viewPastReservationsVm.history = data.payload;
            viewPastReservationsVm.person = data.payload[0];
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    }
})()
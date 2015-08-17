(function () {
    angular.module('restaurantReservationSystem')
        .controller('ViewContactsCtrl', ViewContactsCtrlFn);

    ViewContactsCtrlFn.$inject = ['adminService', '$location']
    function ViewContactsCtrlFn(adminService, $location) {
        var viewContactsVm = this;

        adminService.viewContacts().then(function (data) {
            viewContactsVm.contacts = data.payload;
            console.log(data);
        }, function (err) {
            console.log(err);
        });

        viewContactsVm.viewPastReservations = function (telephone) {
            $location.path('/viewPastReservations/' + telephone);
        }
    }

})()
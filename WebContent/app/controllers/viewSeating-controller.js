(function () {
    angular.module('restaurantReservationSystem')
        .controller('ViewSeatingAreaCtrl', ViewSeatingAreaCtrlFn);

    ViewSeatingAreaCtrlFn.$inject = ['adminService']
    function ViewSeatingAreaCtrlFn(adminService) {
        var viewSeatingAreaVm = this;
        adminService.viewSeatingArea().then(function (data) {
            viewSeatingAreaVm.tables = data.payload;
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    }

})()
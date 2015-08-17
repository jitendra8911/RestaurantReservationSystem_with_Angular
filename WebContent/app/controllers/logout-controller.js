(function () {
    angular.module('restaurantReservationSystem')
        .controller('LogoutCtrl', LogoutCtrlFn);
    LogoutCtrlFn.$inject = ['$window', 'logoutService']
    function LogoutCtrlFn($window, logoutService) {
        var logoutVm = this;
        logoutService
            .logout()
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });


        logoutVm.login = function () {
            $window.location.href = "index.html";
        }
    }
})()
(function () {
    angular.module('restaurantReservationSystem')
        .controller('LoginCtrl', LoginCtrlFn);

    LoginCtrlFn.$inject = ['$location', '$rootScope', '$window', 'loginService']
    function LoginCtrlFn($location, $rootScope, $window, loginService) {
        var loginVm = this;
        loginVm.loginFormsubmitted = false;
        loginVm.isAuthenticatedUser = true;

        loginService
            .checkLogin()
            .then(function (data) {
                if (data.status == 'success') {
                    $window.location.href = "ownerHome.html";
                }
            }, function (err) {
                console.log(err);
            });


        loginVm.authenticate = function (isValid) {
            if (isValid) {

                loginService
                    .authenticateUser(loginVm.adminDetails)
                    .then(function (data) {
                        if (data.payload == 1) {
                            loginVm.isAuthenticatedUser = true;
                            $window.location.href = "ownerHome.html";
                        }
                        else {
                            loginVm.isAuthenticatedUser = false;
                        }
                    }, function (err) {
                        console.log(err);
                    });

                // $window.location.href="ownerHome.html";
            }
            loginVm.loginFormsubmitted = true;
            return isValid;


        }

        loginVm.forgotPassword = function () {

        }
    }

})()
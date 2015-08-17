(function () {
    angular.module('restaurantReservationSystem').controller('SettingsCtrl',
        SettingsCtrlFn);

    SettingsCtrlFn.$inject = ['$filter', 'adminService', '$location', 'customerService', '$modal']
    function SettingsCtrlFn($filter, adminService, $location, customerService, $modal) {
        var settingsVm = this;
        settingsVm.settingsFormSubmitted = false;
        settingsVm.restaurantData = {};
        settingsVm.restaurantData.autoAssign = 'false';

        settingsVm.placeholder = {}
        /* initialize Restaurant Details */
        customerService
            .getRestaurantDetails()
            .then(function (data) {
                settingsVm.placeholder = data.payload;
            }, function (err) {
                console.log(err);
            });

        /* initialize open days options */
        settingsVm.optionsOpenDays = [{
            name: "Sunday",
            value: false
        }, {
            name: "Monday",
            value: true
        }, {
            name: "Tuesday",
            value: true
        }, {
            name: "Wednesday",
            value: true
        }, {
            name: "Thrusday",
            value: true
        }, {
            name: "Friday",
            value: true
        }, {
            name: "Staturday",
            value: true
        }

        ]

        settingsVm.optionsClosingDays = [{
            name: "Sunday",
            value: true
        }, {
            name: "Monday",
            value: false
        }, {
            name: "Tuesday",
            value: false
        }, {
            name: "Wednesday",
            value: false
        }, {
            name: "Thrusday",
            value: false
        }, {
            name: "Friday",
            value: false
        }, {
            name: "Staturday",
            value: false
        }

        ]

        settingsVm.validate = function (isValid) {
            settingsVm.settingsFormSubmitted = true;


            if (isValid) {

                /* get proper format of data and time */
                settingsVm.restaurantData.openTime = $filter('date')(settingsVm.openTime, "HH:mm:ss");
                settingsVm.restaurantData.closingTime = $filter('date')(settingsVm.closingTime, "HH:mm:ss");

                settingsVm.restaurantData.openDays = '';
                settingsVm.restaurantData.closingDays = '';
                /* get all open days checked values */
                settingsVm.optionsOpenDays.forEach(function (option) {
                    if (option.value) {
                        if (settingsVm.restaurantData.openDays) {
                            settingsVm.restaurantData.openDays += ','
                        }
                        settingsVm.restaurantData.openDays += option.name;

                    }
                })


                /* get all closing days checked values */
                settingsVm.optionsClosingDays.forEach(function (option) {
                    if (option.value) {
                        if (settingsVm.restaurantData.closingDays) {
                            settingsVm.restaurantData.closingDays += ','
                        }
                        settingsVm.restaurantData.closingDays += option.name;

                    }
                })

                adminService.updateRestaurantWebSettings(settingsVm.restaurantData).then(function (data) {

                    var modalInstance = $modal.open({
                        animation: true,
                        templateUrl: 'app/views/modalGeneralMessage-tmpl.html',
                        controller: 'ModalGeneralMessageCtrl',
                        controllerAs: 'modalGeneralMessageVm',

                        resolve: {
                            message: function () {
                                return data.message;
                            },
                        }
                    });

                    modalInstance.result.then(function () {

                        if (data.status === 'success') {
                            $location.path('/home')
                        }

                    }, function () {
                        //  console.log('Modal dismissed at: ' + new Date());
                    });

                }, function (err) {
                    console.log(err);
                });

            }

        }
    }

})()
(function () {

    angular.module('restaurantReservationSystem')
        .controller('ModalChangeAssignCtrl', ModalChangeAssignCtrlFn);

    ModalChangeAssignCtrlFn.$inject = ['adminService', '$modalInstance', 'bookingDetails', 'changeAssignFlag']
    function ModalChangeAssignCtrlFn(adminService, $modalInstance, bookingDetails, changeAssignFlag) {

        var modalChangeAssignVm = this;
        modalChangeAssignVm.bookingDetails = bookingDetails;
        modalChangeAssignVm.changeAssignFlag = changeAssignFlag;
        adminService.viewVacantTables(modalChangeAssignVm.bookingDetails.partyTime).then(function (data) {
            modalChangeAssignVm.tableDetails = data.payload;
            modalChangeAssignVm.tableId = modalChangeAssignVm.tableDetails[0].tableId;
        }, function (err) {
            console.log(err);
        });


        modalChangeAssignVm.changeAssign = function () {
            console.log('tableId assigning is' + modalChangeAssignVm.tableId);
            adminService.changeAssignTable(modalChangeAssignVm.bookingDetails.confirmationCode, modalChangeAssignVm.tableId).then(function (data) {
//				 $rootScope.tableId = data.payload.tableId;
//				 console.log(" data payload is");
//				 console.log(data.payload);
            }, function (err) {
                console.log(err);
            });
            $modalInstance.close();
        };

        modalChangeAssignVm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})()
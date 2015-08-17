(function () {
    angular.module('restaurantReservationSystem')
        .filter('phone', phoneFilterFn);


    function phoneFilterFn() {
        return function (phoneStr) {
            console.log('I am called');
            console.log(phoneStr);
            var modifiedPhone;
            if (typeof phoneStr === 'undefined') {
                console.log('phoneStr is undefined');
                return;
            }
            else if (phoneStr.length != 10) {
                console.log('I am in length');
                return phoneStr;
            }
            else {
                modifiedPhone = '(' + phoneStr.substring(0, 3) + ') ' + phoneStr.substring(3, 6) + '-' + phoneStr.substring(6);
                return modifiedPhone;
            }
        }
    }

})()
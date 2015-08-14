(function()

{
     angular.module('restaurantReservationSystem')
     .controller('ViewReservationCtrl',ViewReservationCtrlFn);
     
     ViewReservationCtrlFn.$inject=['adminService']
     function ViewReservationCtrlFn(adminService)
     {
    	 var viewReservationVm=this;
    	 adminService.viewReservationsList().then(function(data) {
    		 viewReservationVm.reservationsList = data.payload;
    		 console.log(data);
    	    }, function(err) {
    	      console.log(err);
    	    });
     }
     
}

)()
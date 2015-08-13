(function()

{
     angular.module('restaurantReservationSystem')
     .controller('EditReservationCtrl',EditReservationCtrlFn);
     
     EditReservationCtrlFn.$inject=['$filter','customerService']
     function EditReservationCtrlFn($filter,customerService)
     {
    	 var editReserveVm=this;
    //	 editReserveVm.bookingDetails.partySize="2";
    	 editReserveVm.partySize="2";
    	 editReserveVm.minDate=new Date();
    	 editReserveVm.editReservationFormSubmitted=false;

    	 editReserveVm.validate=function(isValid)
     	{
     		
    		 editReserveVm.editReservationFormSubmitted=true;
    		 if(isValid)
    			 {
    			 editReserveVm.bookingDetails.partyDate=$filter('date')(editReserveVm.inputDate, "yyyy-MM-dd"); 
    			 editReserveVm.bookingDetails.partyTime=$filter('date')(editReserveVm.inputTime, "HH:mm:ss"); 
    			 editReserveVm.bookingDetails.confirmationCode=sessionStorage.getItem('confirmationCode');
    			 editReserveVm.bookingDetails.partySize=editReserveVm.partySize;
    			// console.log(editReserveVm);
    			 
    			 
    				customerService
    	   		      .updateReservation(editReserveVm.bookingDetails)
    	   		      .then(function(data) {
    	   		        console.log(data);
    	   		        }, function(err) {
    	   		        console.log(err);
    	   		      });
    			 }
     			
     	}
    	 
    	 editReserveVm.cancelReservation=function()
    	 {
    		 var confirmationCode=sessionStorage.getItem('confirmationCode');
    			customerService
	   		      .cancelReservation(confirmationCode)
	   		      .then(function(data) {
	   		        console.log(data);
	   		        }, function(err) {
	   		        console.log(err);
	   		      });
    	 }
     }
     
}

)()
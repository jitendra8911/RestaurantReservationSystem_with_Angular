(function()

{
     angular.module('restaurantReservationSystem')
     .controller('ReserveCtrl',ReserveCtrlFn);
     
     ReserveCtrlFn.$inject=['customerService']
     function ReserveCtrlFn(customerService)
     {
    	 var reserveVm=this;
    	 reserveVm.reserveFormSubmitted=false;

    	 reserveVm.validate=function(isValid)
     	{
     		
    		 reserveVm.reserveFormSubmitted=true;
    		 if(isValid)
    			 {
    			 
    			/* get session storage variables and add it to reserVm */
    			 reserveVm.bookingDetails.partyDate=sessionStorage.getItem('partyDate');
    			 reserveVm.bookingDetails.partyTime=sessionStorage.getItem('partyTime');
    			 reserveVm.bookingDetails.partySize=sessionStorage.getItem('partySize');
    			
    			 /* call reserveTable on customer service */
 	    		customerService
   		      .resreveTable(reserveVm.bookingDetails)
   		      .then(function(data) {
   		        console.log(data);
   		        }, function(err) {
   		        console.log(err);
   		      });
    			 }
     			
     	}
     }
     
}

)()
(function()

{
     angular.module('restaurantReservationSystem')
     .controller('ReserveCtrl',ReserveCtrlFn);
     
     ReserveCtrlFn.$inject=['customerService','$modal','$location']
     function ReserveCtrlFn(customerService,$modal,$location)
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
   		    	  
   		 	  var modalInstance = $modal.open({
			      animation: true,
			      templateUrl: 'app/views/modalGeneralMessage-tmpl.html',
			      controller: 'ModalGeneralMessageCtrl',
			      controllerAs : 'modalGeneralMessageVm',
			     
			      resolve: {
			    	  message: function () {
			          return data.message;
			        },
			      }
			    });

			    modalInstance.result.then(function () {
			    	
			    	 if(data.status==='success')
					 {
			    	$location.path('/home')
					 }

			    }, function () {
			    //  console.log('Modal dismissed at: ' + new Date());
			    });		
   		        }, function(err) {
   		        console.log(err);
   		      });
    			 }
     			
     	}
     }
     
}

)()
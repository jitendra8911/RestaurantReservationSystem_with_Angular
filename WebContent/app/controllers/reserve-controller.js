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
    			 
    			 // check if customer really wants to book the reservation
    			 
    			  var modalInstance = $modal.open({
    			      animation: true,
    			      templateUrl: 'app/views/modalConfirmationMessage-tmpl.html',
    			      controller: 'ModalConfirmationMessageCtrl',
    			      controllerAs : 'modalConfirmationMessageVm',
    			     
    			      resolve: {
    			    	  message: function () {
    			          return 'Do you want to book the reservation';
    			        },
    			      }
    			    });
    			  
    			  
    			  
  			    modalInstance.result.then(function () {
  		 			 
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
  				    	$location.path('/home')
  				    //  console.log('Modal dismissed at: ' + new Date());
  				    });		
  	   		        }, function(err) {
  	   		        console.log(err);
  	   		      });
				    					    	
				    	
			    }, function () {
			    //  console.log('Modal dismissed at: ' + new Date());
			    });	

    			 
   
    			 }
     			
     	}
     }
     
}

)()
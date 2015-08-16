(function()

{
     angular.module('restaurantReservationSystem')
     .controller('EditReservationCtrl',EditReservationCtrlFn);
     
     EditReservationCtrlFn.$inject=['$filter','customerService','$modal','$location']
     function EditReservationCtrlFn($filter,customerService,$modal,$location)
     {
    	 var editReserveVm=this;
    //	 editReserveVm.bookingDetails.partySize="2";
    //	 editReserveVm.partySize="2";
    	 editReserveVm.minDate=new Date();
    	 editReserveVm.editReservationFormSubmitted=false;
    	 editReserveVm.bookingDetails={}
    	 editReserveVm.placeholder={}
    	 editReserveVm.partySize=sessionStorage.getItem('partySize');
    	 editReserveVm.placeholder.inputDate=sessionStorage.getItem('partyDate');
    	 editReserveVm.placeholder.inputTime=sessionStorage.getItem('partyTime');
    	 editReserveVm.placeholder.telephone=sessionStorage.getItem('telephone');

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
    	 
    	 editReserveVm.cancelReservation=function()
    	 {
    		 
      	  	  var modalInstance = $modal.open({
			      animation: true,
			      templateUrl: 'app/views/modalConfirmationMessage-tmpl.html',
			      controller: 'ModalConfirmationMessageCtrl',
			      controllerAs : 'modalConfirmationMessageVm',
			     
			      resolve: {
			    	  message: function () {
			          return 'Do you really want to cancel the reservation.Press ok to cancel';
			        },
			      }
			    });

			    modalInstance.result.then(function () {
					 var confirmationCode=sessionStorage.getItem('confirmationCode');
		    			customerService
			   		      .cancelReservation(confirmationCode)
			   		      .then(function(data) {
			   		        }, function(err) {
			   		        console.log(err);
			   		      });				 
				    	
		    			// display sucessfully canceled reservation message 
		    			
		    			
		   		  	  var modalInstance = $modal.open({
    				      animation: true,
    				      templateUrl: 'app/views/modalGeneralMessage-tmpl.html',
    				      controller: 'ModalGeneralMessageCtrl',
    				      controllerAs : 'modalGeneralMessageVm',
    				     
    				      resolve: {
    				    	  message: function () {
    				          return 'Successfully canceled the reservation.';
    				        },
    				      }
    				    });

    				    modalInstance.result.then(function () {
    		    			$location.path('/home')	

    				    }, function () {
    				    	$location.path('/home')	
    				    //  console.log('Modal dismissed at: ' + new Date());
    				    });	
				    	
				    	
				    	
				    	
				    	
				    	
				    	
			    }, function () {
			    //  console.log('Modal dismissed at: ' + new Date());
			    });	
    		     		
    		     		     		     		     		 
    
    	 }
     }
     
}

)()
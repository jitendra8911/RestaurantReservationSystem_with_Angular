(function()
		{
	 angular.module('restaurantReservationSystem')
     .controller('BookingDetailsCtrl',BookingDetailsCtrlFn);
     
	 BookingDetailsCtrlFn.$inject=['adminService','$routeParams','$modal','$location']
     function BookingDetailsCtrlFn(adminService,$routeParams,$modal,$location)
     {
		
		 var bookingDetailsVm=this;
		 bookingDetailsVm.showChangeOption=false;
		 bookingDetailsVm.showAssignOption=false;
		 var confirmationCode;
		 if(typeof $routeParams.confCode!='undefined')
			 {
			 
			 if(typeof $routeParams.tableId!='undefined')
				 {
				 bookingDetailsVm.showChangeOption=true;
				 }
			 else
				 {
				 bookingDetailsVm.showAssignOption=true;
				 }
			 
			 confirmationCode=$routeParams.confCode;
			 }
		 if(typeof $routeParams.confirmationCode!='undefined')
			 {
			 confirmationCode=$routeParams.confirmationCode;
			 }
		 adminService.viewReservationDetails(confirmationCode).then(function(data) {
			 bookingDetailsVm.bookingDetails = data.payload;
    		 console.log(data);
    	    }, function(err) {
    	      console.log(err);
    	    });
		 
		 bookingDetailsVm.changeAssignTables=function()
		 {
				

					    var modalInstance = $modal.open({
					      animation: true,
					      templateUrl: 'app/views/modalChangeAssign-tmpl.html',
					      controller: 'ModalChangeAssignCtrl',
					      controllerAs : 'modalChangeAssignVm',
					     
					      resolve: {
					    	  bookingDetails: function () {
					          return bookingDetailsVm.bookingDetails;
					        },
					       changeAssignFlag:function(){
					    	   if(bookingDetailsVm.showChangeOption) 
					    		   {
					    		      return 'change';
					    		   }
					    	   else
					    		   {
					    		      return 'assign';
					    		   }
					       }
					      }
					    });

					    modalInstance.result.then(function () {
					    	$location.path('/viewReservation')

					    }, function () {
					      console.log('Modal dismissed at: ' + new Date());
					    });
					 
				 
				 
				
		 }
		 
		 
     }
		})()
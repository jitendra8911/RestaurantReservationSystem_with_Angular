(function()

{
     angular.module('restaurantReservationSystem')
     .controller('ProfileCtrl',ProfileCtrlFn);
     
     ProfileCtrlFn.$inject=['$filter','adminService','$location','customerService','$modal']
     function ProfileCtrlFn($filter,adminService,$location,customerService,$modal)
     {
    	var profileVm=this;
     	profileVm.profileFormsubmitted=false;
     	profileVm.placeholder={}
        /* initialize Restaurant Details */
	    customerService
	      .getRestaurantDetails()
	      .then(function(data) {
	    	  profileVm.placeholder=data.payload;
	        }, function(err) {
	        console.log(err);
	      });

    	profileVm.validate=function(isValid)
    	{
    		
    			profileVm.profileFormsubmitted=true;
    			
    			if(isValid)
    				{
    				
    				 adminService.updateRestaurantProfile(profileVm.restaurantData).then(function(data) {
    					
					  var modalInstance = $moda.open({
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
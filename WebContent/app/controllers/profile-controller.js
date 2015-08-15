(function()

{
     angular.module('restaurantReservationSystem')
     .controller('ProfileCtrl',ProfileCtrlFn);
     
     ProfileCtrlFn.$inject=['$filter','adminService','$location']
     function ProfileCtrlFn($filter,adminService,$location)
     {
    	var profileVm=this;
     	profileVm.profileFormsubmitted=false;

    	profileVm.validate=function(isValid)
    	{
    		
    			profileVm.profileFormsubmitted=true;
    			
    			if(isValid)
    				{
    				console.log('sucessfully validated');
    				 adminService.updateRestaurantProfile(profileVm.restaurantData).then(function(data) {
    					 $location.path('/home');
    		    	    }, function(err) {
    		    	      console.log(err);
    		    	    });
    				}
    			
    	}
     }
     
}

)()
(function()

{
     angular.module('restaurantReservationSystem')
     .controller('ProfileCtrl',ProfileCtrlFn);
     
     ProfileCtrlFn.$inject=['$filter']
     function ProfileCtrlFn($filter)
     {
    	var profileVm=this;
     	profileVm.profileFormsubmitted=false;

    	profileVm.validate=function(isValid)
    	{
    		
    			profileVm.profileFormsubmitted=true;
    			
    	}
     }
     
}

)()
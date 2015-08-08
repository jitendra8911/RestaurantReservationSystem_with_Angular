(function()

{
     angular.module('restaurantReservationSystem')
     .controller('HomeCtrl',HomeCtrlFn);
     
     HomeCtrlFn.$inject=['$location']
     function HomeCtrlFn($location)
     {
    	    var homeVm=this;
    	    homeVm.findATableFormsubmitted = false;
    	    homeVm.reserveTableFormsubmitted=false;
    	    homeVm.FindATableForm = function(isValid) {
    	    	homeVm.findATableFormsubmitted=true;
    	    	if (isValid) {
    	        // Submit as normal
    	    		$location.path('/reserve')
    	    		
    	      } else {
    	    	  homeVm.submitted = true;
    	         }
    	    }
    	    
    	    
    	    homeVm.reserveTableForm = function(isValid) {
    	    	homeVm.reserveTableFormsubmitted=true;
    	    	console.log(homeVm.confirmationCode);
    	    	if (isValid) {
    	        // Submit as normal
    	    		$location.path('/editReservation')
    	    		
    	      } else {
    	    	  homeVm.submitted = true;
    	         }
    	    }
     }
     
}

)()
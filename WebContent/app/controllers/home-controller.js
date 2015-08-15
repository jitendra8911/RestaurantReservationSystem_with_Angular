(function()

{
     angular.module('restaurantReservationSystem')
     .controller('HomeCtrl',HomeCtrlFn)
     HomeCtrlFn.$inject=['$location','$filter','customerService']
     function HomeCtrlFn($location,$filter,customerService)
     {
    	    var homeVm=this;
    	    homeVm.partySize="2";
    	    homeVm.minDate=new Date();
    	   // console.log(homeVm.minDate);
    	    homeVm.findATableFormsubmitted = false;
    	    homeVm.reserveTableFormsubmitted=false;
    	    
    	    /* initialize Restaurant Details */
    	    customerService
  	      .getRestaurantDetails()
  	      .then(function(data) {
  	    	homeVm.restaurantDetails=data.payload;
  	        }, function(err) {
  	        console.log(err);
  	      });
    	    
    	    
    	    
    	    homeVm.FindATableForm = function(isValid) {
    	    	var partyDate=$filter('date')(homeVm.inputDate, "yyyy-MM-dd"); 
    	    	var partyTime=$filter('date')(homeVm.inputTime, "HH:mm:ss"); 
    	    //	homeVm.inputDate=$filter('date')(homeVm.inputDate, "yyyy-MM-dd"); 
    	    //	homeVm.inputTime=$filter('date')(homeVm.inputTime, "HH:mm:ss"); 
    	    	homeVm.findATableFormsubmitted=true;
    	    	if (isValid) {
    	        // Submit as normal
    	    		sessionStorage.setItem('partyDate',partyDate);
    	    		sessionStorage.setItem('partyTime',partyTime);
    	    		sessionStorage.setItem('partySize',homeVm.partySize);
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
    	    		sessionStorage.setItem('confirmationCode',homeVm.confirmationCode);
    	    		$location.path('/editReservation')
    	    		
    	      } else {
    	    	  homeVm.submitted = true;
    	         }
    	    }
     }
     
}

)()
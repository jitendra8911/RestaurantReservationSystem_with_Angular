(function()

{
     angular.module('restaurantReservationSystem')
     .controller('LoginCtrl',LoginCtrlFn);
     
     LoginCtrlFn.$inject=['$location','$rootScope','$window']
     function LoginCtrlFn($location,$rootScope,$window)
     {
    	 var loginVm=this;
    	 loginVm.loginFormsubmitted=false;
    	 loginVm.authenticate=function(isValid)
    	 {
    		 if(isValid)
    			 {
    		 $window.location.href="ownerHome.html";
    			 }
    		 loginVm.loginFormsubmitted=true;
             return isValid;
    		       
    		
    	 }
    	 
    	 loginVm.forgotPassword=function()
    	 {
    		 
    	 }
     }
     
}

)()
(function()

{
     angular.module('restaurantReservationSystem')
     .controller('SettingsCtrl',SettingsCtrlFn);
     
     SettingsCtrlFn.$inject=[]
     function SettingsCtrlFn()
     {
    	 var settingsVm=this;
    	 settingsVm.settingsFormSubmitted=false;
    	 settingsVm.validate=function(isValid)
     	{
     		 console.log('i am here');
    		 settingsVm.settingsFormSubmitted=true;
    		 console.log(settingsVm.settingsFormSubmitted);
     			
     	}
     }
     
}

)()
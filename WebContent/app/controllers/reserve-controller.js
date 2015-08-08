(function()

{
     angular.module('restaurantReservationSystem')
     .controller('ReserveCtrl',ReserveCtrlFn);
     
     ReserveCtrlFn.$inject=[]
     function ReserveCtrlFn()
     {
    	 var reserveVm=this;
    	 reserveVm.reserveFormSubmitted=false;

    	 reserveVm.validate=function(isValid)
     	{
     		
    		 reserveVm.reserveFormSubmitted=true;
     			
     	}
     }
     
}

)()
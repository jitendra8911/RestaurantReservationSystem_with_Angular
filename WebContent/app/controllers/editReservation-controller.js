(function()

{
     angular.module('restaurantReservationSystem')
     .controller('EditReservationCtrl',EditReservationCtrlFn);
     
     EditReservationCtrlFn.$inject=[]
     function EditReservationCtrlFn()
     {
    	 var editReserveVm=this;
    	 editReserveVm.editReservationFormSubmitted=false;

    	 editReserveVm.validate=function(isValid)
     	{
     		
    		 editReserveVm.editReservationFormSubmitted=true;
     			
     	}
     }
     
}

)()
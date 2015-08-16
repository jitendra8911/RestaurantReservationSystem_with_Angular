(function()
		{
	 angular.module('restaurantReservationSystem')
     .controller('ModalGeneralMessageCtrl',ModalGeneralMessageCtrlFn);
     
	 ModalGeneralMessageCtrlFn.$inject=['$modalInstance','message']
     function ModalGeneralMessageCtrlFn($modalInstance,message)
     {
		
		 var modalGeneralMessageVm=this;
		 modalGeneralMessageVm.message=message;
		 modalGeneralMessageVm.ok=function()
		 {
			 $modalInstance.close();
		 }
     }
		})()
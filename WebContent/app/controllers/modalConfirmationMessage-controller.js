(function()
		{
	angular.module('restaurantReservationSystem')
    .controller('ModalConfirmationMessageCtrl',ModalConfirmationMessageCtrlFn);
    
	ModalConfirmationMessageCtrlFn.$inject=['$modalInstance','message']
    function ModalConfirmationMessageCtrlFn($modalInstance,message)
    {
		
		 var modalConfirmationMessageVm=this;
		 modalConfirmationMessageVm.message=message;

		 modalConfirmationMessageVm.ok = function () {			 
			    $modalInstance.close();
			  };

			  modalConfirmationMessageVm.cancel = function () {
				  $modalInstance.dismiss('cancel');
			  }; 
		 
		 
    }
		})()
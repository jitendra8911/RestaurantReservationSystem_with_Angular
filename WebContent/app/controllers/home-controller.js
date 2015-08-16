(function()

{
     angular.module('restaurantReservationSystem')
     .controller('HomeCtrl',HomeCtrlFn)
     HomeCtrlFn.$inject=['$location','$filter','customerService','$modal','adminService']
     function HomeCtrlFn($location,$filter,customerService,$modal,adminService)
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
    	    		
    	    		// check if confirmationCode exists
    	    		// if not display a popup message that the confirmation number doesn't exist
    	    		
    	    		adminService
    	    	      .viewReservationDetails(homeVm.confirmationCode)
    	    	      .then(function(data) {
    	    	    	  if(data.status==='success')
    	    	    		  {
    	    	    		  
    	    	    		  sessionStorage.setItem('confirmationCode',homeVm.confirmationCode);
    	    	    		  sessionStorage.setItem('partySize',data.payload.partySize);
    	    	    		  sessionStorage.setItem('partyDate',data.payload.partyDate);
    	    	    		  sessionStorage.setItem('partyTime',data.payload.partyTime);
    	    	    		  sessionStorage.setItem('telephone',data.payload.telephone);
    	    	    		  $location.path('/editReservation')
    	    	    		  }
    	    	    	  else
    	    	    		  {
    	    	    		    
    	    	    		     
    	    	    		  var modalInstance = $modal.open({
    	    				      animation: true,
    	    				      templateUrl: 'app/views/modalGeneralMessage-tmpl.html',
    	    				      controller: 'ModalGeneralMessageCtrl',
    	    				      controllerAs : 'modalGeneralMessageVm',
    	    				     
    	    				      resolve: {
    	    				    	  message: function () {
    	    				          return data.message;
    	    				        },
    	    				      }
    	    				    });

    	    				    modalInstance.result.then(function () {
    	    				    }, function () {
    	    				    //  console.log('Modal dismissed at: ' + new Date());
    	    				    });	
    	    	    		  
    	    	    		  
    	    	    		  
    	    	    		  }
    	    	        }, function(err) {
    	    	        	
    	    	        	
    	    	        	
    	    	      	  var modalInstance = $modal.open({
	    				      animation: true,
	    				      templateUrl: 'app/views/modalGeneralMessage-tmpl.html',
	    				      controller: 'ModalGeneralMessageCtrl',
	    				      controllerAs : 'modalGeneralMessageVm',
	    				     
	    				      resolve: {
	    				    	  message: function () {
	    				          return 'please enter a valid reservation number';
	    				        },
	    				      }
	    				    });

	    				    modalInstance.result.then(function () {
	    				    }, function () {
	    				    //  console.log('Modal dismissed at: ' + new Date());
	    				    });	
    	    	      });   	    		
    	    	
    	    		
    	      } else {
    	    	  homeVm.submitted = true;
    	         }
    	    }
     }
     
}

)()
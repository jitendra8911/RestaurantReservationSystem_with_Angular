(function()

	{
		angular.module('restaurantReservationSystem')
			.controller('HomeCtrl',HomeCtrlFn)
		HomeCtrlFn.$inject=['$location','$filter']
		function HomeCtrlFn($location,$filter)
		{
			var homeVm=this;
			homeVm.partySize="2";
			homeVm.minDate=new Date();
			console.log(homeVm.minDate);
			homeVm.findATableFormsubmitted = false;
			homeVm.reserveTableFormsubmitted=false;
			homeVm.FindATableForm = function(isValid) {
				homeVm.inputDate=$filter('date')(homeVm.inputDate, "yyyy-MM-dd");
				homeVm.inputTime=$filter('date')(homeVm.inputTime, "HH:mm:ss");
				homeVm.findATableFormsubmitted=true;
				if (isValid) {
					// Submit as normal
					sessionStorage.setItem('partyDate',homeVm.inputDate);
					sessionStorage.setItem('partyTime',homeVm.inputTime);
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
					$location.path('/editReservation')

				} else {
					homeVm.submitted = true;
				}
			}
		}

	}

)()
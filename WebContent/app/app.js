(function() {

	angular.module('restaurantReservationSystem', [ 'ngRoute','ngMessages' ]).config(
		moduleConfig);

	moduleConfig.$inject = [ '$routeProvider' ];
	function moduleConfig($routeProvider) {
		$routeProvider

			.when('/home', {
				templateUrl : 'app/views/home-tmpl.html',
				controller : 'HomeCtrl',
				controllerAs : 'homeVm'

			})

			.when('/login', {
				templateUrl : 'app/views/login-tmpl.html',
				controller : 'LoginCtrl',
				controllerAs : 'loginVm'

			})


			.when('/reserve', {
				templateUrl : 'app/views/reserve-tmpl.html',
				controller : 'ReserveCtrl',
				controllerAs : 'reserveVm'

			})


			.when('/editReservation', {
				templateUrl : 'app/views/editReservation-tmpl.html',
				controller : 'EditReservationCtrl',
				controllerAs : 'editReserveVm'

			})


			.when('/viewReservation', {
				templateUrl : 'app/views/viewReservation-tmpl.html',
				controller : 'ViewReservationCtrl',
				controllerAs : 'viewReservationVm'

			})

			.when('/viewSeatingArea', {
				templateUrl : 'app/views/viewSeatingArea-tmpl.html',
				controller : 'ViewSeatingAreaCtrl',
				controllerAs : 'viewSeatingAreaVm'

			})


			.when('/profile', {
				templateUrl : 'app/views/profile-tmpl.html',
				controller : 'ProfileCtrl',
				controllerAs : 'profileVm'

			})


			.when('/settings', {
				templateUrl : 'app/views/settings-tmpl.html',
				controller : 'SettingsCtrl',
				controllerAs : 'settingsVm'

			})

			.when('/viewContacts', {
				templateUrl : 'app/views/viewContacts-tmpl.html',
				controller : 'ViewContactsCtrl',
				controllerAs : 'viewContactsVm'

			})

			.when('/changeAssignTable', {
				templateUrl : 'app/views/changeAssignTable-tmpl.html',
				controller : 'ChangeAssignTableCtrl',
				controllerAs : 'changeAssignTableVm'

			})

			.when('/logout', {
				templateUrl : 'app/views/logout-tmpl.html',
				controller : 'LogoutCtrl',
				controllerAs : 'logoutVm'

			})


			.otherwise({
				redirectTo: '/home'
			});
	}

})()
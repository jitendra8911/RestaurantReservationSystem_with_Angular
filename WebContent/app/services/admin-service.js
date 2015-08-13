(function()

{
	'use strict';
	angular.module('restaurantReservationSystem').service('adminService',
			adminServiceFn);

	adminServiceFn.$inject = [ '$q', '$http' ];
	function adminServiceFn($q, $http) {
		var self = this;
		self.viewSeatingArea = function() {

			 var defer = $q.defer();

		      $http({
		          method: 'GET',
		          url: 'api/admin/viewSeatingArea'
		          })
		        .success(function(data) {
		          defer.resolve(data);
		        })
		        .error(function(err) {
		          defer.reject(err);
		        });

		      return defer.promise;
			
		}

	}

})()
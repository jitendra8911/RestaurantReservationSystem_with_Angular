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
		

	    self.viewReservationDetails = function(confirmationCode) {
	      var defer = $q.defer();

	      $http({
	          method: 'GET',
	          url: 'api/admin/viewReservationDetails/' + confirmationCode
	        })
	        .success(function(data) {
	          defer.resolve(data);
	        })
	        .error(function(err) {
	          defer.reject(err);
	        });

	      return defer.promise;
	    };
	    
	    
	    self.viewReservationsList = function() {
		      var defer = $q.defer();

		      $http({
		          method: 'GET',
		          url: 'api/admin/viewReservationsList'
		        })
		        .success(function(data) {
		          defer.resolve(data);
		        })
		        .error(function(err) {
		          defer.reject(err);
		        });

		      return defer.promise;
		    };
		    
		
		    self.viewVacantTables = function(partyTime) {
			      var defer = $q.defer();

			      $http({
			          method: 'GET',
			          url: 'api/admin/viewVacantTables/' + partyTime
			        })
			        .success(function(data) {
			          defer.resolve(data);
			        })
			        .error(function(err) {
			          defer.reject(err);
			        });

			      return defer.promise;
			    };

			    

			    self.changeAssignTable = function(confirmationCode,tableId) {
				      var defer = $q.defer();

				      $http({
				          method: 'GET',
				          url: 'api/admin/changeAssignTable/' + confirmationCode+'/'+tableId
				        })
				        .success(function(data) {
				          defer.resolve(data);
				        })
				        .error(function(err) {
				          defer.reject(err);
				        });

				      return defer.promise;
				    };

	}

})()
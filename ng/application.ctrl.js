angular.module('app')
	.controller('ApplicationCtrl', function ($scope, USER_ROLES, UserSvc, $location, $window, localStorageService) {

		$scope.currentUser = localStorageService.get('currentUser')
		$scope.userRoles = USER_ROLES
		$scope.isAuthorized = UserSvc.isAuthorized

		 $scope.setCurrentUser = function (user) {
		 	localStorageService.set('currentUser', user);
		 	$scope.currentUser = localStorageService.get('currentUser')
		 }

		$scope.$on('flash', function (_, message) {
			$scope.err = message
		})

		$scope.logout = function () {
			$scope.currentUser = null
			UserSvc.logout()
			delete $window.sessionStorage.token
			localStorageService.remove('currentUser');
			$location.path('/')
		}
	})
	.factory('authInterceptor', function ($rootScope, $q, $window) {
	  return {
	    request: function (config) {
	      config.headers = config.headers || {};
	      if ($window.sessionStorage.token) {
	        config.headers.Authorization = $window.sessionStorage.token;
	      }
	      return config;
	    },
	    response: function (response) {
	      if (response.status === 401) {
	        // handle the case where the user is not authenticated
	      }
	      return response || $q.when(response);
	    }
	  };
	})
	.config(function ($httpProvider, localStorageServiceProvider) {
	  $httpProvider.interceptors.push('authInterceptor');
	  localStorageServiceProvider.setStorageType('sessionStorage');
	})
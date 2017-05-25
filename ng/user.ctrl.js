angular.module('app')
	.controller('UserCtrl', function ($scope, $rootScope, AUTH_EVENTS, $location, UserSvc) {
		$scope.login = function (useraccount, password) {
			UserSvc.login(useraccount, password)
				.then(function (response) {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.setCurrentUser(response.data)
					$location.path('/');
				})
		}

		$scope.checkbox_checked = 0;
		$scope.passwordck = "";
		$scope.register = function (username, useraccount, password, sex, phone, email, address, born) {
			UserSvc.createUser(username, useraccount, password, sex, phone, email, address, born)
				.error(function (response) {
					$scope.$emit('flash', response)
				})
				.success(function () {
					$scope.login(useraccount, password);
				})
		}
	})
	.directive('passwordMatch', [function () {
	    return {
	        restrict: 'A',
	        scope:true,
	        require: 'ngModel',
	        link: function (scope, elem , attrs, control) {
	            var checker = function () {
	 
	                //get the value of the first password
	                var e1 = scope.$eval(attrs.ngModel); 
	 
	                //get the value of the other password  
	                var e2 = scope.$eval(attrs.passwordMatch);
	                return e1 == e2;
	            };
	            scope.$watch(checker, function (n) {
	 
	                //set the form control to valid if both 
	                //passwords are the same, else invalid
	                control.$setValidity("unique", n);
	            });
	        }
	    };
	}]);
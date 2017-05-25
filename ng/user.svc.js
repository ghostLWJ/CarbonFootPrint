angular.module('app')
	.service('UserSvc', function ($http, $window, localStorageService) {
		var svc = this
		svc.getUser = function () {
			return $http.get('/api/users')
		}
		svc.login = function (useraccount, password) {
			return $http.post('/api/sessions', {
				useraccount: useraccount, password: password
			}).then(function (val) {
				svc.token = val.data
				$http.defaults.headers.common['Authorization'] = val.data
				$window.sessionStorage.token = val.data
				return svc.getUser()
			})
		}

		svc.logout = function () {
			$http.defaults.headers.common['Authorization'] = ''
		}

		svc.createUser = function (username, useraccount, password, sex, phone, email, address, born) {
			return $http.post('/api/users', {
				username: username, useraccount: useraccount, password: password, sex: sex, phone: phone, email: email, address:address, born:born
			}).success(function (val) {

			}).error(function (val) {
				svc.err = val
				return svc.err
			})
		}

		svc.isAuthenticated = function () {
		    return !!localStorageService.get('currentUser')
		}

		svc.isAuthorized = function (authorizedRoles) {
		    if (!angular.isArray(authorizedRoles)) {
		      authorizedRoles = [authorizedRoles];
		    }
		    return (svc.isAuthenticated() &&
		      authorizedRoles.indexOf(localStorageService.get('currentUser').auth) !== -1);
		}
	})
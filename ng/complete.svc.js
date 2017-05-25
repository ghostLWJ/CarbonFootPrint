angular.module('app')
	.service('CompleteSvc', function ($http) {
		var svc = this
		svc.fetchPersonalOrder = function (useraccount) {
			return $http.get('/api/personal_order/' + useraccount)
		}
	})
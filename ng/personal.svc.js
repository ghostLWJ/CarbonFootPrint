angular.module('app')
	.service('PersonalSVC', function ($http) {
		var svc = this
		svc.ftechHistoryPosition = function (useraccount) {
			return $http.get('/api/history_position/' + useraccount)
		}
		svc.ftechHistoryOrder = function (useraccount) {
			return $http.get('/api/history_order/' + useraccount)
		}
	})
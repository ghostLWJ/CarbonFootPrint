angular.module('app')
	.service('OrderSvc', function ($http) {
		var svc = this
		svc.order = function (useraccount, username, order, cashtotal, mark) {
			return $http.post('/api/order', { headers: {'Content-type': 'application/json' }, useraccount:useraccount, username:username, order: order, cashtotal: cashtotal, mark: mark})
		}

		svc.fetch = function() {
			return $http.get('/api/order')
		}

		svc.fetchOne = function(id) {
			return $http.get('/api/checkout/' + id)
		}

		svc.fetchUser = function(useraccount) {
			return $http.post('/api/checkout', { headers: {'Content-type': 'application/json' }, useraccount:useraccount})
		}
	})
angular.module('app')
	.service('MenuSvc', function ($http) {
		var svc = this
		svc.upload = function (file, name, price) {
			var fd = new FormData()
        	// fd.append('file', file)
        	// fd.append('name', name)
        	// fd.append('price', price)
			return $http.post('/api/menu', 
			{ file: file, name: name, price: price } )
		}

		svc.fetch = function () {
			return $http.get('/api/menu')
		}
	})
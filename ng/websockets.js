angular.module('app')
	.run(function ($rootScope) {
		var url = 'wss://localhost:3011'
		var connection = new WebSocket(url)
		
		connection.onopen = function () {
			console.log('WebSocket connected')
		}

		connection.onmessage = function (e) {
			console.log(e)
			var payload = JSON.parse(e.data)
			$rootScope.$broadcast('ws:' + payload.topic, payload.data)
		}
	})
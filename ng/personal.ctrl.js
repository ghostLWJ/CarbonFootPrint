angular.module('app')
	.controller('personalCtrl', function ($scope, PersonalSVC) {
		PersonalSVC.ftechHistoryPosition($scope.currentUser.useraccount)
			.success(function (positions) {
					$scope.positions = positions
					setDate()
	        	})
	        	.error(function(err) {

	        	})
		PersonalSVC.ftechHistoryOrder($scope.currentUser.useraccount)
			.success(function (orders) {
					$scope.orders = orders
	        	})
	        	.error(function(err) {

	        	})

	    $scope.showPoint = false
        $scope.showOrder = false

        
        $scope.showHistoryPoint = function () {
            $scope.showPoint = !$scope.showPoint
            $scope.showOrder = false;
        }

        $scope.showHistoryOrder = function () {
            $scope.showOrder = !$scope.showOrder
            $scope.showPoint = false
        }     

	    $scope.change = function (key) {
	    	//alert(key)
	    	var currDate
	    	var currNextDate
	    	$scope.map.center = {latitude: $scope.mongoLat[key], longitude: $scope.mongoLon[key]}
	    	$scope.polylines[0].path = [];
    		currDate = new Date($scope.mongoDate[key]);
    		currDate = currDate.toDateString()
	    	for(v in $scope.positions){
	    		currNextDate = new Date($scope.positions[v].date);
	    		currNextDate = currNextDate.toDateString()

	    		if(currNextDate == currDate){
	    			var temp = [{latitude: $scope.positions[v].latitude, longitude: $scope.positions[v].longitude}]
	    			$scope.polylines[0].path.unshift(temp[0])

	    		}
	    	}
	    }

	    function setDate () {
            var i = 0
	    	var currDate
	    	var currNextDate
			$scope.date = new Array()
			$scope.mongoDate = []
			$scope.mongoLat = []
			$scope.mongoLon = []
	    	for(v in $scope.positions){
	    		currDate = new Date($scope.positions[i].date);
	    		currDate = currDate.toDateString()

	    		currNextDate = new Date($scope.positions[v].date);
	    		currNextDate = currNextDate.toDateString()

	    		if(!(currNextDate == currDate)){
	    			$scope.date.unshift(currDate)
	    			$scope.mongoDate.unshift($scope.positions[i].date)
	    			$scope.mongoLat.unshift($scope.positions[i].latitude)
	    			$scope.mongoLon.unshift($scope.positions[i].longitude)
	    			i = v
		    		currDate = new Date($scope.positions[i].date);
		    		currDate = currDate.toDateString()
	    		}
	    	}
	    	currDate = new Date($scope.positions[i].date);
	    	$scope.date.unshift(currDate)
	    	$scope.mongoDate.unshift($scope.positions[i].date)
			$scope.mongoLat.unshift($scope.positions[i].latitude)
			$scope.mongoLon.unshift($scope.positions[i].longitude)
        }

		$scope.map = {center: {latitude: 25.086557, longitude: 121.565488 }, zoom: 17, bounds: {}};
        $scope.polylines = [
            {
                id: 1,
                path: [
                    {
                        latitude: 25.086518,
                        longitude: 121.564040
                    },
                    {
                        latitude: 25.086557,
                        longitude: 121.565488
                    }
                ],
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: true,
                draggable: true,
                geodesic: true,
                visible: true,
                icons: [{
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                    },
                    offset: '25px',
                    repeat: '50px'
                }]
            }
        ]
	})

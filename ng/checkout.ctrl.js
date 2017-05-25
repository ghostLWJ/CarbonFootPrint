angular.module('app')
  .controller('CheckoutCtrl', function ($scope, OrderSvc, $location, OrderFactory, localStorageService) {
  		$scope.save = ""
        $scope.saveD = ""

        OrderSvc.fetchOne(OrderFactory.get())
        	.success(function (order) {
        		localStorageService.set('currentOrder', order)
            	$scope.order = localStorageService.get('currentOrder')
                var dis = parseInt($scope.order.cashtotal) * 0.9
                dis = parseInt(dis)
                var num = parseInt($scope.order.cashtotal)

                var can = (num - dis)*4
                $scope.discount = can
                OrderSvc.fetchUser($scope.order.useraccount)
                    .success(function (user) {
                        $scope.user = user
                    })
        	})
        	.error(function(err) {
        		localStorageService.set('currentOrder', null)
        		$location.path('/order')
        	})

        $scope.showDiscount = false
        $scope.showCash = true
        $scope.showText = "折扣"
        $scope.changeD = 0
        
        $scope.now = function () {
            $scope.showDiscount = !$scope.showDiscount
            $scope.showCash = !$scope.showCash
            if($scope.showCash){
                $scope.showText = "折扣"
            }else{
                $scope.showText = "現金"
            }

            $scope.order.cashtotal = $scope.order.cashtotal - $scope.changeD
        }

        $scope.add = function (num) {
        	if(num === -1){
        		if($scope.save.length === 1){
        			$scope.save = ""
        		} else {
        			var temp_str = $scope.save.substr(0,$scope.save.length-1)
        			$scope.save = temp_str
        			//$scope.save.length = $scope.save.length-1
        			//alert($scope.save.length)
        		}
        	} else {
        		$scope.save = $scope.save + "" + num
        	}

        	$scope.change = parseInt($scope.save - $scope.order.cashtotal)

        	if($scope.save.charAt(0) === "0"){
        		$scope.save = ""
        	}

        	if($scope.save.length === 0){
        		$scope.change = ""
        	}
        } 
        $scope.addD = function (num) {
            if(num === -1){
                if($scope.saveD.length === 1){
                    $scope.saveD = ""
                } else {
                    var temp_str = $scope.saveD.substr(0,$scope.saveD.length-1)
                    $scope.saveD = temp_str
                    //$scope.save.length = $scope.save.length-1
                    //alert($scope.save.length)
                }
            } else {
                $scope.saveD = $scope.saveD + "" + num
            }

            $scope.changeD = parseInt($scope.saveD / 4)

            if($scope.saveD.charAt(0) === "0"){
                $scope.saveD = ""
            }

            if($scope.saveD.length === 0){
                $scope.changeD = ""
            }
        }    
  })
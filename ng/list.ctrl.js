angular.module('app')
	.controller('ListCtrl', function ($scope, $location, OrderSvc, MenuFactory) {
		$scope.cart = MenuFactory.get()

        checkCart()		

        function checkCart(){
            if(isEmptyObj($scope.cart)){
                $location.path('/menu')
            }
        }

        function isEmptyObj(obj){
            return Object.keys(obj).length?false:true;
        }

        $scope.order = function () {
            OrderSvc.order($scope.currentUser.useraccount, $scope.currentUser.username, $scope.cart, $scope.totalPrice(), $scope.mark)
            $location.path('/complete')
        }

		//計算合計金額
        $scope.totalPrice = function(){
            var total = 0;
            angular.forEach($scope.cart,function(item){
                total += item.price * item.quantity;
            })
            return total;
        }
        //計算商品總數
        $scope.totalQuantity = function(){
            var totalq = 0;
            angular.forEach($scope.cart,function(item){
                if(item.quantity===''||item.quantity===null||item.quantity<0){
                    item.quantity=1;
                }
                totalq +=  parseInt(item.quantity);
            })
            return totalq;
        }
        //找到索引
        var findIndex = function(id){
            angular.forEach($scope.cart,function(item,key){
                if(item.id === id){
                    index = key;
                    return;
                }
            })
            return index;
        }
        //移除操作
        $scope.remove = function(id){
            var index =-1;
            var index =findIndex(id);
            angular.forEach($scope.cart,function(item,key){
                if(item.id === id){
                    index = key;
                }
            })
            if(index !== -1){
                var returnkey = confirm('是否從購物車中移除該商品？');
                if(returnkey){
                    $scope.cart.splice(index,1);
                }
            }
            checkCart()
        }
        //清空购物车
        $scope.removeAll = function(){
            var returnkey = confirm('是否清空購物車？');
            if(returnkey){
                $scope.cart = [];
            }
            checkCart()
        }
        //为商品添加购买数量
        $scope.qadd = function(id){
            var index =-1;
            var index =findIndex(id);
            if(index !== -1){
                $scope.cart[index].quantity=parseInt($scope.cart[index].quantity)+1;
            }
        }
        //为商品减少购买数量
        $scope.qreduce = function(id){
            var index =-1;
            var index =findIndex(id);
            if(index !== -1){
                if($scope.cart[index].quantity>1){
                    $scope.cart[index].quantity=parseInt($scope.cart[index].quantity)-1;
                }else{
                        $scope.remove(id);
                }
            }
        }

	})
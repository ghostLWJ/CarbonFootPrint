angular.module('app')
	.controller('MenuCtrl', function ($scope, $location, MenuSvc, MenuFactory) {
        MenuSvc.fetch().success(function (menu) {
            $scope.cart = menu
        })

        function getMenuLength (menus) {
            var jsonlength = 0;
            for (var run in menus){
                jsonlength ++;
            }
            return jsonlength
        }

        function addToList (menus, list) {
            for (var add in menus){
                if(parseInt(menus[add].quantity) !== 0){
                    list.unshift(menus[add])
                }
            }
            list.pop()
            list.pop()
        }

        $scope.nextPage = function() {
            $scope.list = [{},{}]
            addToList($scope.cart, $scope.list)
            MenuFactory.set($scope.list)
            $location.path('/list')
        }

        //合計金額
        // $scope.totalPrice = function(){
        //     var total = 0;
        //     angular.forEach($scope.cart,function(item){
        //         total += item.price * item.quantity;
        //     })
        //     return total;
        // }
        //商品總數
        // $scope.totalQuantity = function(){
        //     var totalq = 0;
        //     angular.forEach($scope.cart,function(item){
        //         if(item.quantity===''||item.quantity===null||item.quantity<0){
        //             item.quantity=1;
        //         }
        //         totalq +=  parseInt(item.quantity);
        //     })
        //     return totalq;
        // }
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
        // $scope.remove = function(id){
        //     var index =-1;
        //     var index =findIndex(id);
        //     angular.forEach($scope.cart,function(item,key){
        //         if(item.id === id){
        //             index = key;
        //         }
        //     })
        //     if(index !== -1){
        //         var returnkey = confirm('是否移除這項商品？');
        //         if(returnkey){
        //             $scope.cart.splice(index,1);
        //         }
        //     }
        // }
        //增加購買數量
        $scope.qadd = function(id){
            var index =-1;
            var index =findIndex(id);
            if(index !== -1){
                $scope.cart[index].quantity=parseInt($scope.cart[index].quantity)+1;
            }
        }
        //減少購買數量
        $scope.qreduce = function(id){
            var index =-1;
            var index =findIndex(id);
            if(index !== -1){
                if($scope.cart[index].quantity>0){
                    $scope.cart[index].quantity=parseInt($scope.cart[index].quantity)-1;
                }else{
                    
                }
            }
        }
	})
    .factory('MenuFactory', function () {
         var savedData = {}
         function set(data) {
           savedData = data;
         }
         function get() {
          return savedData;
         }

         return {
          set: set,
          get: get
         }
    });
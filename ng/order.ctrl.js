angular.module('app')
	.controller('OrderCtrl', function ($scope, OrderSvc, $location, OrderFactory) {
        $scope.checkout = function (id) {
            OrderFactory.set(id)
            $location.path('/checkout')
        }

        OrderSvc.fetch().success(function (orders) {
            $scope.orders = orders
        })

        $scope.$on('ws:new_order', function (_, order) {
            $scope.$apply(function () {
                $scope.orders.push(order)
            })
        })
	})
    .factory('OrderFactory', function () {
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
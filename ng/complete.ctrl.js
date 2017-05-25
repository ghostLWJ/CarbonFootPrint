angular.module('app')
  .controller('CompleteCtrl', function ($scope, CompleteSvc) {
    CompleteSvc.fetchPersonalOrder($scope.currentUser.useraccount)
        .success(function (personalOrder) {
        	for(v in personalOrder){
        		$scope.personalOrder = personalOrder[v]
        	}
            
            currTime = new Date($scope.personalOrder.date);
            b = 30
            currTime.setMinutes(currTime.getMinutes() + b, currTime.getSeconds(), 0);
            $scope.timePlus = currTime
        })
        .error(function(err) {
            $location.path('/')
         })
  })
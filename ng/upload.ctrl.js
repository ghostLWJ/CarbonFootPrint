angular.module('app')
	.controller('UploadCtrl', function ($scope, MenuSvc, $location) {
		$scope.upload = function (name, price) {
			var file = $scope.image
			MenuSvc.upload(file, name, price)
		}
	})
	.directive('fileModel', ['$parse', function ($parse) {
	return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);    
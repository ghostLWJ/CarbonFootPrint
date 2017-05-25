angular.module('app')
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', { controller: '', templateUrl: 'carbonfootprint.html' })
			.when('/register', { controller: 'UserCtrl', templateUrl: 'register.html' })
			.when('/login', { controller: 'UserCtrl', templateUrl: 'login.html'})
			.when('/posts', { controller: 'PostsCtrl', templateUrl: 'posts.html'})
			.when('/menu', {controller: 'MenuCtrl', templateUrl: 'menu.html'})
			.when('/menulist', {controller: 'MenuCtrl', templateUrl: 'menulist.html'})
			.when('/list', {controller: 'ListCtrl', templateUrl: 'list.html'})
			.when('/personal', {controller: 'personalCtrl', templateUrl: 'personal.html'})
			.when('/edit', {controller: 'UploadCtrl', templateUrl: 'edit.html'})
			.when('/order', {controller: 'OrderCtrl', templateUrl: 'order.html'})
			.when('/checkout', {controller: 'CheckoutCtrl', templateUrl: 'checkout.html'})
			.when('/complete', {controller: 'CompleteCtrl', templateUrl: 'complete.html'})
			.otherwise({ redirectTo: '/' });
		$locationProvider.html5Mode(true)
	})
angular.module('inspectors.login', [
	'ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
		function ($stateProvider, $urlRouterProvider, $locationProvider) {
		   $stateProvider
		      .state('login', {
		        url: '/login',
		        templateUrl: 'login/login.tpl.html'
	      	});
	}])
	.value('test', 2);
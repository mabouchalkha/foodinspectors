angular.module('authentication.login', [
		'ui.router'])
			.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
				function ($stateProvider, $urlRouterProvider, $locationProvider) {
				   $stateProvider
				      .state('login', {
				        url: '/login',
				        templateUrl: 'authentication/login/login.tpl.html',
				        controller: 'LoginController as login',
				        data: {
				        		// userLimit: 5 etc... some Params
				        }
			      	});
			}])
			.value('test', 2);
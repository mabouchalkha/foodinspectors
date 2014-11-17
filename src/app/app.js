angular.module('inspectors', [
	'inspectors.login',
	'ui.router',
	'templates-app',
	'inspectors.modules'
])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
		function($stateProvider, $urlRouterProvider, $locationProvider) {
			$stateProvider
				.state('home', {
					url: '/',
					template: '<div>This is the application root.</div>',
					controller: 'TestCtrl'
				});

				$urlRouterProvider.otherwise('/');
					
				// $locationProvider.html5Mode(true);
	}])
	.controller('TestCtrl', ['debug', function(debug) {
  		debug('say it is so.');
	}]);
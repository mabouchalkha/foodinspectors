angular.module('app', [
	//module's app
	'layouts',
	'authentication',
	'dashboard',
	//module's's angularjs
	'ui.router',
	//all template html 
	'templates-app',
	//module npm 
	'app.modules'
])
	.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('app', {
					url: '',
					abstract: true,
				});

				$urlRouterProvider.otherwise('/');
					
				// $locationProvider.html5Mode(true);
	}])
	.controller('TestCtrl', ['debug', function(debug) {
  		debug('say it is so.');
  		this.statement = 'This is the application root.'
	}]);
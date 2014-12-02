angular.module('app', [
	//module's app
	'layouts',
	'authentication',
	'dashboard',
	'interceptors.authInterceptor',
	//module's angularjs
	'ui.router',
	'restangular',
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
	}]);
	// .config(['$httpProvider', function ($httpProvider) {
	// 	$httpProvider.interceptors.push('AuthInterceptor');
	// }])

	// .controller('AppCtrl', ['debug', function(debug) {
 //  		debug('say it is so.');
 //  		this.statement = 'This is the application root.'
	// }]);
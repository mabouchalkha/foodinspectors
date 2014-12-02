angular.module('app', [
	//module's app
	'layouts',
	'authentication',
	'dashboard',
	'common.authInterceptor',
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
				.state('home', {
					url: '',
					abstract: true,
					views: {
						'header@': {
							controller: 'HeaderCtrl as header',
							templateUrl: 'layouts/header/header.tpl.html'
						},
						'nav@': {
							controller: 'NavCtrl as nav',
							templateUrl: 'layouts/nav/nav.tpl.html'
						}
					}
				})
				.state('home.index', {
					url: '/',
					views: {
						'content@': {
							controller: 'DashboardCtrl as dashboard',
							templateUrl: 'dashboard/dashboard.tpl.html'
						}
					}
		      });

				$urlRouterProvider.otherwise('/');
					
				// $locationProvider.html5Mode(true);
	}])
	// .config(['$httpProvider', function ($httpProvider) {
	// 	$httpProvider.interceptors.push('AuthInterceptor');
	// }])
	.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
  }]);
	// .controller('AppCtrl', ['debug', function(debug) {
 //  		debug('say it is so.');
 //  		this.statement = 'This is the application root.'
	// }]);
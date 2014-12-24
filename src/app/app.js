angular.module('app', [
	//module's angularjs
	'ngMessages',
	'ngAnimate',
	'ngAria',
	'ui.router',
	'restangular',
	//module's app
	'layouts',
	'authentication',
	'dashboard',
	'contact',
	'app.common',
	//all template html 
	'templates-app',
	//module npm 
	'app.modules'
])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
		function($stateProvider, $urlRouterProvider, $httpProvider) {
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
			
			$httpProvider.interceptors.push('AuthInterceptor');
	}])
	.run(function ($rootScope, $translate) {
		$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
			$translate.refresh();
		});
	});
// .controller('AppCtrl', ['debug', function(debug) {
	//  		debug('say it is so.');
	//  		this.statement = 'This is the application root.'
	// }]);
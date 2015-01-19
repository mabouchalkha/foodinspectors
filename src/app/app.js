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
	'settings',
    'paiement_term',
	'relationships',
	'inventory',
	'sales',
	'purchase',
	'notfound',
	'app.common',
	//all template html 
	'templates-app',
	//module npm 
	'app.modules'
])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 
	function($stateProvider, $urlRouterProvider, $httpProvider) {
			
		var getCurrentUser = function (AuthService, $state) {
			return AuthService.currentUser().then(function (user) {
				// if (!user) $state.go('auth.login');
			});
		};
				 
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
				},
				resolve: {
					currentUser: getCurrentUser
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

		$urlRouterProvider.otherwise('/404');
			
		$httpProvider.interceptors.push('AuthInterceptor');
		$httpProvider.interceptors.push('LoadingInterceptor');
	}])
	.run(function ($rootScope, $translate) {
		$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
			$translate.refresh();
		});
	})
	.controller('AppCtrl', ['$state', 'debug', function($state, debug) {
		// debug('say it is so.');
		// 	 		this.statement = 'This is the application root.'
		var app = this;
		
		app.isSpecificPage = isSpecificPage;
			
		function isSpecificPage() {
			return _.contains(['404', 'auth.login', 'auth.signup'], $state.current.name);
		};
	}]);
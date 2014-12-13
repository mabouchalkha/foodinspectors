angular.module('app', [
	//module's app
	'layouts',
	'authentication',
	'dashboard',
	'common.services.authService',
	//module's angularjs
	'ngAria',
	'ui.router',
	'restangular',
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
				
				$httpProvider.defaults.useXDomain = true;
				delete $httpProvider.defaults.headers.common["X-Requested-With"]; 
				// $locationProvider.html5Mode(true);
	}])
	.config(['$httpProvider' ,function($httpProvider) {

		$httpProvider.interceptors.push('AuthInterceptor');
  }])
  .run(['$rootScope', '$http', '$state', function($rootScope, $http, $state) {
	    $rootScope.$on('event:unauthorized', function() {
	      $state.go('home.signup')
	    });
	 }]);
	// .controller('AppCtrl', ['debug', function(debug) {
 //  		debug('say it is so.');
 //  		this.statement = 'This is the application root.'
	// }]);
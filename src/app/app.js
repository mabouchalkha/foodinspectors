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
	'relationships',
	'inventory',
	'sales',
	'purchase',
	'notfound',
	'app.common',
	//all template html 
	'templates-app',
	//module npm 
	'app.modules',
])
	.constant('API_CONF', {
		apiUrl: 'https://fiapi.herokuapp.com/',
		//apiUrl: 'http://127.0.0.1:3000/',
		debugInfoEnabled: false
	})
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider', 'PermissionProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider, PermissionProvider) {

		var getCurrentUser = function (AuthService, $state) {
			return AuthService.currentUser().then(function (user) {
				if (!user) $state.go('auth.login');
			});
		};
		
		var access = PermissionProvider.$get().accessLevels();

		$stateProvider
			.state('home', {
				url: '',
				abstract: true,
				views: {
					'header@': {
						controller: 'HeaderCtrl as vm',
						templateUrl: 'layouts/header/header.tpl.html'
					},
					'nav@': {
						controller: 'NavCtrl as nav',
						templateUrl: 'layouts/nav/nav.tpl.html'
					}
				},
				resolve: {
					//currentUser: getCurrentUser
				},
	         data: {
	            access: access.public
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
		    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
		$urlRouterProvider.rule(function($injector, $location) {
			if($location.protocol() === 'file')
			   return;

			var path = $location.path();
			// Note: misnomer. This returns a query object, not a search string
			var search = $location.search();
			var params;

			// check to see if the path already ends in '/'
			if (path[path.length - 1] === '/') {
			   return;
			}

			// If there was no search string / query params, return with a `/`
			if (Object.keys(search).length === 0) {
			   return path + '/';
			}

			// Otherwise build the search string and return a `/?` prefix
			params = [];
			angular.forEach(search, function(v, k){
			   params.push(k + '=' + v);
			});
			return path + '/?' + params.join('&');
		});
			
		// Disabling debug info for production
		//$compileProvider.debugInfoEnabled(false);

		defaultHeaders = {
			"Content-Type": "application/json",
			"Accept-Language": "en",
		};
		
		$httpProvider.defaults.headers["delete"] = defaultHeaders;
		$httpProvider.defaults.headers.patch = defaultHeaders;
		$httpProvider.defaults.headers.post = defaultHeaders;
		$httpProvider.defaults.headers.put = defaultHeaders;

		$httpProvider.useApplyAsync(true);
		$httpProvider.interceptors.push('AuthInterceptor');
		$httpProvider.interceptors.push('LoadingInterceptor');
	}])
	.run(function ($rootScope, $translate, $state, $stateParams, AuthService) {
		
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		
		$rootScope.$on('$translatePartialLoaderStructureChanged', function () {
			$translate.refresh();
		});

		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        
        if(!('data' in toState) || !('access' in toState.data)){
            $rootScope.error = "Access undefined for this state";
            event.preventDefault();
        }
        else if (!AuthService.authorize(toState.data.access)) {
            $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
            event.preventDefault();

            if(fromState.url === '^') {
                if(AuthService.isLoggedIn()) {
                    $state.go('home.index');
                } else {
                    $rootScope.error = null;
                    $state.go('auth.login');
                }
            }
        }
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
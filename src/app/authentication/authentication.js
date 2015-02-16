angular.module('authentication', [
	'ngMessages',
	'ngAnimate',
	'ngAria',
	'ui.router',
	'common.services.user.userService'
])
.config(['$stateProvider', 'PermissionProvider', function($stateProvider, PermissionProvider) {
	
	var access = PermissionProvider.$get().accessLevels();

	$stateProvider
		.state('auth', {
			url: '',
			abstract: true,
			data: {
            access: access.anon
         }
		})
		.state('auth.signup', {
	      url: "/signup",
	      views: {
	      		'content@': {
	      			controller: 'AuthenticationController as vm',
	      			templateUrl: 'authentication/signup/signup.tpl.html'
	      		}
	      }
		})
		.state('auth.login', {
	      url: "/login",
	      views: {
	      		'content@': {
	      			controller: 'AuthenticationController as vm',
	      			templateUrl: 'authentication/login/login.tpl.html'
	      		}
	      }
		})
}]);
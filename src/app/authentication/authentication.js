angular.module('authentication', [
	'ngMessages',
	'ngAnimate',
	'ngAria',
	'ui.router',
	'common.services.user.userService'
])
.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('auth', {
			url: '',
			abstract: true,
		})
		.state('auth.signup', {
	      url: "/signup",
	      views: {
	      		'content@': {
	      			controller: 'AuthenticationController as auth',
	      			templateUrl: 'authentication/signup/signup.tpl.html'
	      		}
	      }
		})
		.state('auth.login', {
	      url: "/login",
	      views: {
	      		'content@': {
	      			controller: 'AuthenticationController as auth',
	      			templateUrl: 'authentication/login/login.tpl.html'
	      		}
	      }
		})
}]);
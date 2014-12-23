angular.module('authentication.signup', [
	'ngMessages',
	'ngAnimate',
	'ngAria',
	'ui.router',
	'common.services.user.userService'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.signup', {
			        url: "/signup",
			        views: {
			        		'content@': {
			        			controller: 'SignupController as signup',
			        			templateUrl: 'authentication/signup/signup.tpl.html'
			        		}
			        }
		      	});
		}]);
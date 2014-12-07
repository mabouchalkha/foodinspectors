angular.module('authentication.signup', [
	'ui.router',
	'common.services.userService'
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
angular.module('paiement_term', [
	'ngMessages',
	'ngAnimate',
	'ngAria',
	'ui.router',
	'common.services.user.userService'
])
.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('home.paiement_term', {
	        url: "/paiementterm",
	        views: {
	      		'content@': {
	      			controller: 'AuthenticationController as auth',
	      			templateUrl: 'authentication/signup/signup.tpl.html'
	      		}
	      }
		})
		.state('home.paiement_term.id', {
	        url: "/:id",
	        views: {
	      		'content@': {
	      			controller: 'AuthenticationController as auth',
	      			templateUrl: 'authentication/login/login.tpl.html'
	      		}
	      }
		})
        .state('home.paiement_term.create', {
            url: "/create",
            views: {
                'content@': {
                    controller: 'AuthenticationController as auth',
	      			templateUrl: 'authentication/login/login.tpl.html'
                }
            }
        })
}]);
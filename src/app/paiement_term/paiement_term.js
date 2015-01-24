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
		}).state('home.paiement_term.id', {
      url: "/:id",
      views: {
        'content@': {
          controller: 'PaiementTermController as pt',
          templateUrl: 'paiement_term/paiement_term.tpl.html',
        }
      },
      resolve: {
        viewModel: ['PaiementTerm', 'stateParams', function (PaiementTerm, stateParams) {
          return PaiementTerm.read(stateParams.id);
        }]
      }})
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
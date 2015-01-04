angular.module('contact', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.contact', {
			        url: "/contact",
			        views: {
				        	'content@': {
				        		controller: 'ContactCtrl as contact',
				        		templateUrl: 'contact/contact.tpl.html'
			        		}
			        }
		      	});
			}])
		.controller('ContactCtrl', ['$scope', '$stateParams', 'ContactService', function ($scope, $stateParams, ContactService) {
			var contact = this;

			contact.registerParams = {};

			contact.submitContact = submitContact;

			function submitContact() {
        		ContactService.create(contact.registerParams).then(
        			function(contact) {
        			},
        			function(reason){
        			});
        };

		}]);
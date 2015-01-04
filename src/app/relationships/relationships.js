angular.module('relationships', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.relationships', {
			        url: "/relationships",
			        views: {
				        	'content@': {
				        		controller: 'RelationshipsCtrl as relationships',
				        		templateUrl: 'relationships/relationships.tpl.html'
			        		}
			        }
		      	});
			}])
		.controller('RelationshipsCtrl', ['$stateParams', 'NotificationsService', function ($stateParams, NotificationsService) {
			var relationships = this;
			
		}]);
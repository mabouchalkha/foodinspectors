angular.module('notfound', [])
.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('404', {
	      url: "/notfound",
	      views: {
	      		'content@': {
	      			controller: 'NotfoundCtrl as notfound',
	      			templateUrl: '404/404.tpl.html'
	      		}
	      }
		})
}])		
	.controller('NotfoundCtrl', ['$stateParams', 'NotificationsService', function ($stateParams, NotificationsService) {
			var notfound = this;
			
		}]);
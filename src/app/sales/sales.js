angular.module('sales', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.sales', {
			        url: "/sales",
			        views: {
				        	'content@': {
				        		controller: 'SalesCtrl as sales',
				        		templateUrl: 'sales/sales.tpl.html'
			        		}
			        }
		      	});
			}])
		.controller('SalesCtrl', ['$stateParams', 'NotificationsService', function ($stateParams, NotificationsService) {
			var sales = this;
			
		}]);
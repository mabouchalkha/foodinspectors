angular.module('inventory', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.inventory', {
			        url: "/inventory",
			        views: {
				        	'content@': {
				        		controller: 'InventoryCtrl as inventory',
				        		templateUrl: 'inventory/inventory.tpl.html'
			        		}
			        }
		      	});
			}])
		.controller('InventoryCtrl', ['$stateParams', 'NotificationsService', function ($stateParams, NotificationsService) {
			var inventory = this;
			
		}]);
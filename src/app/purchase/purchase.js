angular.module('purchase', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.purchase', {
			        url: "/purchase",
			        views: {
				        	'content@': {
				        		controller: 'PurchaseCtrl as purchase',
				        		templateUrl: 'purchase/purchase.tpl.html'
			        		}
			        }
		      	});
			}])
		.controller('PurchaseCtrl', ['$stateParams', 'NotificationsService', function ($stateParams, NotificationsService) {
			var purchase = this;
			
		}]);
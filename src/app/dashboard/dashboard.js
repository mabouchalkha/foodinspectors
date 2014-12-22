angular.module('dashboard', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.dashboard', {
			        url: "/dashboard",
			        views: {
				        	'content@': {
				        		controller: 'DashboardCtrl as dashboard',
				        		templateUrl: 'dashboard/dashboard.tpl.html'
			        		}
			        }
		      	});
			}])
		.controller('DashboardCtrl', ['$scope', '$stateParams', 'NotificationsService', function ($scope, $stateParams, NotificationsService) {
			var dashboard = this;
			
			NotificationsService.info('test', 'test title');
		}]);
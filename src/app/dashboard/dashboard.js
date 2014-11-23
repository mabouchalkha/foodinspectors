angular.module('dashboard', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('app.layouts.dashboard', {
			        url: '/dashboard',
			        views: {
			        	'content@': {
			        		controller: 'DashboardCtrl',
			        		templateUrl: 'dashboard/dashboard.tpl.html'
			        	}
			        }
		      	});
			}])
		.controller('DashboardCtrl', ['$scope', function ($scope) {
			
		}]);
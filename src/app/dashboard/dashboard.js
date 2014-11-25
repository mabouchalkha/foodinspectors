angular.module('dashboard', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('app.layouts.dashboard', {
			        url: 'dashboard',
			        views: {
			        	'content@': {
			        		controller: 'DashboardCtrl as dashboard',
			        		templateUrl: 'dashboard/dashboard.tpl.html'
			        	}
			        }
		      	});
			}])
		.controller('DashboardCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
			var dashboard = this;
		}]);
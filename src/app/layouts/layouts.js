angular.module('layouts', [
	'ui.router',
	'layouts.nav',
	'layouts.header'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('app.layouts', {
			        url: '/',
			        views: {
			        	'header@': {
			        		controller: 'HeaderCtrl',
			        		templateUrl: 'layouts/header/header.tpl.html'
			        	},
			        	'nav@': {
			        		controller: 'NavCtrl',
			        		templateUrl: 'layouts/nav/nav.tpl.html'
			        	},
			        	'content@': {
			        		controller: 'DashboardCtrl',
			        		templateUrl: 'dashboard/dashboard.tpl.html'
			        	}
			        }
		      	});
			}]);

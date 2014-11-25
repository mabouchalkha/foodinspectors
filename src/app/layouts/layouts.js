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
			        		controller: 'HeaderCtrl as header',
			        		templateUrl: 'layouts/header/header.tpl.html'
			        	},
			        	'nav@': {
			        		controller: 'NavCtrl as nav',
			        		templateUrl: 'layouts/nav/nav.tpl.html'
			        	},
			        	'content@': {
			        		controller: 'DashboardCtrl as dashboard',
			        		templateUrl: 'dashboard/dashboard.tpl.html'
			        	}
			        }
		      	});
			}]);

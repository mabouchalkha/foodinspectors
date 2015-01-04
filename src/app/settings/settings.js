angular.module('settings', [
	'ui.router'
	])
		.config(['$stateProvider', function ($stateProvider) {
			   $stateProvider
			      .state('home.settings', {
			        url: "/settings",
			        views: {
				        	'content@': {
				        		controller: 'SettingsCtrl as settings',
				        		templateUrl: 'settings/settings.tpl.html'
			        		}
			        }
		      	});
			}])
		.controller('SettingsCtrl', ['$stateParams', 'NotificationsService', function ($stateParams, NotificationsService) {
			var settings = this;
			
		}]);
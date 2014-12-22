angular.module('layouts.header', [
	'ui.router',
	'pascalprecht.translate',
	'common.services.i18n.i18nService',
	'common.services.notifications'
	])
	.controller('HeaderCtrl', ['NotificationsService', function (NotificationsService) {
		var header = this;

		header.brand = 'Food Inspectors';
		
		header.changeLanguage = changeLanguage;
		header.getNotifications = getNotifications;

		function changeLanguage (langKey) {
			$translate.use(langKey);
		};
		
		function getNotifications () {
			return NotificationsService.getNotifications();
			console.log(NotificationsService.getNotifications().length);
		};
		
	}]);
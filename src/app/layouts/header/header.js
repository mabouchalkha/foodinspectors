angular.module('layouts.header', [
	'ui.router',
	'pascalprecht.translate',
	'common.services.i18n.i18nService',
	'common.services.notifications',
	'common.services.user.userService'
	])
	.controller('HeaderCtrl', ['UserService', 'NotificationsService', function (UserService, NotificationsService) {
		var header = this;

		header.brand = 'Food Inspectors';
		
		header.logout = logout;
		header.changeLanguage = changeLanguage;
		header.getNotifications = getNotifications;

		
		UserService.currentUser().then(function(user){
			header.user = user;
		});
		
		function logout () {
			UserService.logout();
			header.user = null;
		};
		
		function changeLanguage (langKey) {
			$translate.use(langKey);
		};
		
		function getNotifications () {
			return NotificationsService.getNotifications();
			console.log(NotificationsService.getNotifications().length);
		};
		
	}]);
angular.module('layouts.header', [
	'ui.router',
	'pascalprecht.translate',
	'common.services.i18n.i18nService',
	'common.services.notifications',
	'common.services.user.userService'
	])
	.controller('HeaderCtrl', ['UserService', 'NotificationsService', '$translate', function (UserService, NotificationsService, $translate) {
		var header = this;

		header.brand = 'Food Inspectors';
		
		header.logout = logout;
		header.changeLanguage = changeLanguage;
		header.getFlag = getFlag;
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
			header.language = langKey;
		};
		
		function getFlag() {
			var _flag = '';
			switch (header.language) {
                case 'en':
						 _flag = 'flags-american';
						 break;
                case 'fr':
						 _flag = 'flags-france' 
						 break;
					 }
					 
					 return _flag;
		};
		
		function getNotifications () {
			return NotificationsService.getNotifications();
			console.log(NotificationsService.getNotifications().length);
		};
		
	}]);
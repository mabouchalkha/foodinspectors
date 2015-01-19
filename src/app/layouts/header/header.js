angular.module('layouts.header', [
	'ui.router',
	'pascalprecht.translate',
	'common.services.i18n.i18nService',
	'common.services.notifications',
	'common.services.user.userService'
	])
	.controller('HeaderCtrl', ['UserService', 'NotificationsService', '$translate', function (UserService, NotificationsService, $translate) {
		var header = this;

		var _init = function () {
		
			header.brand = 'Food Inspectors';
			
			UserService.currentUser().then(function(user){
				header.user = user;
			});
			
			header.language = 'en';//user.culture.language;		
		};	
		
		header.logout = function logout () {
			UserService.logout();
			header.user = null;
		};
		
		header.changeLanguage = function changeLanguage (langKey) {
			header.language = langKey;
			$translate.use(langKey);
		};
		
		header.getFlag = function getFlag() {
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
		
		header.getNotifications = function getNotifications () {
			return NotificationsService.getNotifications();
			console.log(NotificationsService.getNotifications().length);
		};
		
		_init();
		
	}]);
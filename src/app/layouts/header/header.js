angular.module('layouts.header', [
	'ui.router',
	'pascalprecht.translate',
	'common.services.i18n.i18nService',
	'common.services.notifications',
	'common.services.user.userService'
	])
	.controller('HeaderCtrl', ['$rootScope', 'UserService', 'NotificationsService', '$translate', '$state', function ($rootScope, UserService, NotificationsService, $translate, $state) {
		var vm = this;

		var _init = function () {
		
			vm.brand = 'Food Inspectors';
			
			UserService.currentUser().then(function(user){
				vm.user = user;
			});
			
			vm.language = 'en';//user.culture.language;		
		};	
		
		vm.logout = function logout () {
			UserService.logout();
			vm.user = null;
			$state.go('auth.login');
		};
		
		vm.changeLanguage = function changeLanguage (langKey) {
			vm.language = langKey;
			$translate.use(langKey);
		};
		
		vm.getFlag = function getFlag() {
			var _flag = '';
			switch (vm.language) {
                case 'en':
						 _flag = 'flags-american';
						 break;
                case 'fr':
						 _flag = 'flags-france' 
						 break;
					 }
					 
					 return _flag;
		};
		
		vm.getNotifications = function getNotifications () {
			return NotificationsService.getNotifications();
			console.log(NotificationsService.getNotifications().length);
		};

		$rootScope.$on('user:set', function() {
			UserService.currentUser().then(function(user){
				vm.user = user;
			});
		});

		$rootScope.$on('user:unset', function() {
			vm.user = null;
			$state.go('auth.login');
     	});
		
		_init();
		
	}]);
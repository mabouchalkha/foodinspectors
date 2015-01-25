angular.module('common.services', [
	'common.services.authentication.authService',
	'common.services.user.userService',
	'common.services.contact.contactService',
	'common.services.i18n.i18nService',
	'common.services.notifications',
	'common.services.loading',
	'common.services.permission.permissionService'
	]);
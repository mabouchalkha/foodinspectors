angular.module('layouts.header', [
	'ui.router',
	'pascalprecht.translate',
	'common.services.i18n.i18nService'
	])
		.controller('HeaderCtrl', ['$scope', function ($scope) {
			var header = this;

			header.brand = 'Food Inspectors';
			
			header.changeLanguage = changeLanguage;

			var changeLanguage = function(langKey) {
				$translate.use(langKey);
			};

		}]);
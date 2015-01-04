angular.module('layouts.nav', [
	'ui.router',
	'pascalprecht.translate'
	])
	.controller('NavCtrl', ['$scope', '$translatePartialLoader', function ($scope, $translatePartialLoader) {
		// $translatePartialLoader.addPart('nav');
		var nav = this;
	}]);
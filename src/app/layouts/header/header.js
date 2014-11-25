angular.module('layouts.header', [
	'ui.router'
	])
		.controller('HeaderCtrl', ['$scope', function ($scope) {
			var header = this;

			header.brand = 'Food Inspectors';
		}]);
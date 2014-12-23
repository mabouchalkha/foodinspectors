angular.module('common.directives.authentication', [])
.directive('validatePasswordCharacters', [function () {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            ngModel.$validators.lowerCase = function (value) {
                var pattern = /[a-z]+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };
            ngModel.$validators.upperCase = function (value) {
                var pattern = /[A-Z]+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };
            ngModel.$validators.number = function (value) {
                var pattern = /\d+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };
            ngModel.$validators.specialCharacter = function (value) {
                var pattern = /\W+/;
                return (typeof value !== 'undefined') && pattern.test(value);
            };
            ngModel.$validators.eightCharacters = function (value) {
                return (typeof value !== 'undefined') && value.length >= 8;
            };
        }
    }
}]);

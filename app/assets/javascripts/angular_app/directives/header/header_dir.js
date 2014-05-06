angular.module("starterApp").directive('header', function () {
    return {
        restrict: 'E',
        templateUrl: 'angular_app/directives/header/header.html',
        replace: true,
        transclude: true,
        scope: {
            
        }
    };
});
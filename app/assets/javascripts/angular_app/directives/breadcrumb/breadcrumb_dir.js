angular.module("starterApp").directive('breadcrumb', function () {
    return {
        restrict: 'E',
        templateUrl: 'angular_app/directives/breadcrumb/breadcrumb.html',
        replace: true,
        transclude: true,
        scope: {
            
        },
        link: function LinkingFunction(scope, elem, attrs) { 
        }
    };
});
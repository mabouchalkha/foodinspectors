angular.module("starterApp").directive('sidebar', function () {
    return {
        restrict: 'E',
        templateUrl: 'angular_app/directives/sidebar/sidebar.html',
        replace: true,
        transclude: true,
        scope: {
            
        },
        link: function LinkingFunction(scope, elem, attrs) { 
               scope.isMenuMin = false;
               scope.isMinimifiedDisplay = false;
        }
    };
});
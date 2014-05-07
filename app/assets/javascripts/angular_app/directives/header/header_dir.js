angular.module("starterApp").directive('header', ['Session', function (Session) {
    return {
        restrict: 'E',
        templateUrl: 'angular_app/directives/header/header.html',
        replace: true,
        transclude: true,
        link: function($scope, element, attrs) {
            var _init = function () {
                
            };
            
            $scope.logout = function () {
                Session.logout();
            };
            
            _init();
        }
    };
}]);
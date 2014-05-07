angular.module("starterApp").directive('header', ['Session', function (Session) {
    return {
        restrict: 'E',
        templateUrl: 'angular_app/directives/header/header.html',
        replace: true,
        transclude: true,
        link: function($scope, element, attrs) {
            var _init = function () {
                $scope.user = {};
                $scope.service = Session;
            };
            
            $scope.$watch('service.currentUser', function(user, oldUser) {
                if(!_.isEmpty(user))
                    if (!_.isEmpty(user.first_name) && !_.isEmpty(user.last_name)) {
                        $scope.user.name = user.first_name + ' ' + user.last_name;   
                    }
                    else if (!_.isEmpty(user.user_name)) {
                        $scope.user.name = user.user_name
                    }
                    else {
                        $scope.user.name = user.email
                    }
                else
                    $scope.user = {};
            });
            
            $scope.logout = function () {
                Session.logout();
            };
            
            _init();
        }
    };
}]);
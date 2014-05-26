angular.module("starterApp").controller('LoginCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session) {
    var _init = function () {
        $scope.user = { rememberme: true};
    };
    
    $scope.login = function() {
        Session.login($scope.user);
    };

    $scope.resetPassword = function () {
        Session.resetPassword($scope.user.email);
    }
    
    _init();
}]);
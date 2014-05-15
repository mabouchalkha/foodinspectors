angular.module("starterApp").controller('AppCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session) {
    $scope.user = {};
    $scope.service = Session;
    
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
    
    $scope.isSpecificPage = function() {
        var path;
        path = $location.path();
        return _.contains(['/404', '/500', '/login'], path);
    };
    
    $scope.logout = function () {
        Session.logout();
    }
    
    return $scope.main = {
        brand: 'Food Inspection'
    };
  }
]);

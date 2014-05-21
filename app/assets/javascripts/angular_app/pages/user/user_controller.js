//'use strict';

angular.module('starterApp').controller('UserCtrl', ['$scope', 'viewModel', 'userResource', '$location', '$route', function ($scope, viewModel, userResource, $location, $route) {
    var _init = function () {
        $scope.user = viewModel.data;
        $scope.meta = viewModel.meta;
        
        _assignIsAdmin($scope.user);
    };
    
    $scope.$watch('user.is_admin', function (n, o) {
        if (n == o) return;
        
        _assignRolesMask($scope.user);
    });
    
    $scope.save = function () {
        if ($scope.user != null) {
            userResource.save({id: $scope.user.id, user: $scope.user}).$promise.then(function (resp) {
                $location.path('/user/');
            });
        }
    };
    
    $scope.cancel = function () {
        $location.path('/user/');
    };
    
    $scope.apply = function () {
        if ($scope.user != null) {
            userResource.save({id: $scope.user.id, user: $scope.user}).$promise.then(function (resp) {
                $route.reload();
            });
        }
    };
    
    var _assignIsAdmin = function (user) {
        if (user != null) {
            if (user.roles_mask == 1) {
                user.is_admin = true;
            }
            else {
                user.is_admin = false;
            }
        }
    };
    
    var _assignRolesMask = function (user) {
        if (user != null) {
            if (user.is_admin == true) {
                user.roles_mask = 1;
            }
            else {
                user.roles_mask = 2;
            }
        }
    };
    
    _init();
}]);

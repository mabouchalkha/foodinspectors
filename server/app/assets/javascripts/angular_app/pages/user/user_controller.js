//'use strict';

angular.module('starterApp').controller('UserCtrl', ['$scope', 'viewModel', 'userResource', '$location', '$route', 'notif', function ($scope, viewModel, userResource, $location, $route, notif) {
    var _init = function () {
        $scope.user = viewModel.data;
        $scope.meta = viewModel.meta;
        
        _assignIsAdmin($scope.user);
    };
    
    $scope.$watch('user.is_admin', function (n, o) {
        if (n == o) return;
        
        _assignRolesMask($scope.user);
    });
    
    $scope.save = function (isSave) {
        if ($scope.user != null) {
            var toast = notif.wait('Loading', 'Please wait while saving the user');
            
            if ($scope.meta.is_new == true) {
                userResource.create({id: $scope.user.id, user: $scope.user}).$promise.then(function (resp) {
                    _saveCallback(isSave, toast, resp);
                });   
            }
            else {
                userResource.update({id: $scope.user.id, user: $scope.user}).$promise.then(function (resp) {
                    _saveCallback(isSave, toast, resp);
                });
            }
        }
    };
    
    var _notifyUpdateOrCreate = function (isNew) {
        if (isNew == true) {
            notif.log('User created', 'The user has been successfully updated');
        }
        else {
            notif.log('User updated', 'The user has been successfully updated');
        }
    };
    
    var _saveCallback = function (isSave, toast, resp) {
        notif.clear(toast);
        _notifyUpdateOrCreate($scope.meta.is_new);
        
        if (isSave == true) {
            $location.path('/user');
        }
        else {
            $location.path('/user/' + resp.data);
        }
    }
    
    $scope.cancel = function () {
        $location.path('/user');
    };
    
    $scope.delete = function () {
        var toast = notif.wait('Loading', 'Please wait while deleting user');
        userResource.delete({id : $scope.user.id}).$promise.then(function (resp) {
             notif.clear(toast);
             notif.log('User deleted', 'The user has been successfully deleted');
             $location.path('/user');
        });
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
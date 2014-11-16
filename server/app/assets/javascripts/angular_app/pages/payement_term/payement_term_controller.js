//'use strict';

angular.module('starterApp').controller('PayementTermCtrl', ['$scope', 'viewModel', 'payementTermResource', '$location', '$route', 'notif', function ($scope, viewModel, payementTermResource, $location, $route, notif) {
    var _init = function () {
        $scope.payementTerm = viewModel.data;
        $scope.meta = viewModel.meta;
    };
    
    $scope.save = function (isSave) {
        if ($scope.payementTerm != null) {
            var toast = notif.wait('Loading', 'Please wait while saving payement term');
            
            if ($scope.meta.is_new == true) {
                payementTermResource.create({id: $scope.payementTerm.id, payementTerm: $scope.payementTerm}).$promise.then(function (resp) {
                    _saveCallback(isSave, toast, resp);
                });   
            }
            else {
                payementTermResource.update({id: $scope.payementTerm.id, payementTerm: $scope.payementTerm}).$promise.then(function (resp) {
                    _saveCallback(isSave, toast, resp);
                });
            }
        }
    };
    
    $scope.cancel = function () {
        $location.path('/payementTerm');
    };
    
    $scope.delete = function () {
        var toast = notif.wait('Loading', 'Please wait while deleting user');
        payementTermResource.delete({id : $scope.payementTerm.id}).$promise.then(function (resp) {
             notif.clear(toast);
             notif.log('Payement term deleted', 'The payement term has been successfully deleted');
             $location.path('/payementTerm');
        });
    };
    
    var _notifyUpdateOrCreate = function (isNew) {
        if (isNew == true) {
            notif.log('Payement term created', 'The payement term has been successfully updated');
        }
        else {
            notif.log('Payement term updated', 'The payement term has been successfully updated');
        }
    };
    
    var _saveCallback = function (isSave, toast, resp) {
        notif.clear(toast);
        _notifyUpdateOrCreate($scope.meta.is_new);
        
        if (isSave == true) {
            $location.path('/payementTerm');
        }
        else {
            $location.path('/payementTerm/' + resp.data);
        }
    }
    
    _init();
}]);
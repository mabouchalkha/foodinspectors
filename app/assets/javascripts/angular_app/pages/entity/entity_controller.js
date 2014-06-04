//'use strict';

angular.module('starterApp').controller('EntityCtrl', ['$scope', 'viewModel', 'entityResource', '$location', '$route', 'notif', function ($scope, viewModel, entityResource, $location, $route, notif) {
    var _init = function () {
        $scope.entity = viewModel.data;
        $scope.meta = viewModel.meta;
    };
    
    $scope.save = function () {
        if ($scope.entity != null) {
            var toast = notif.wait('Loading', 'Please wait while saving entity');
            entityResource.save({id: $scope.entity.id, entity: $scope.entity}).$promise.then(function (resp) {
                _saveCallback(true, toast);
            });
        }
    };
    
    $scope.cancel = function () {
        $location.path('/entity');
    };
    
    $scope.apply = function () {
        if ($scope.entity != null) {
            var toast = notif.wait('Loading', 'Please wait while saving the entity');
            entityResource.save({id: $scope.entity.id, entity: $scope.entity}).$promise.then(function (resp) {
                _saveCallback(false, toast);
            });
        }
    };
    
    $scope.delete = function () {
        var toast = notif.wait('Loading', 'Please wait while deleting the entity');
        entityResource.delete({id : $scope.entity.id}).$promise.then(function (resp) {
             notif.clear(toast);
             notif.log('Entity deleted', 'The entity has been successfully deleted');
             $location.path('/entity');
        });
    };
    
    var _notifyUpdateOrCreate = function (isNew) {
        if (isNew == true) {
            notif.log('Entity created', 'The entity has been successfully updated');
        }
        else {
            notif.log('Entity updated', 'The entity has been successfully updated');
        }
    };
    
    var _saveCallback = function (isSave, toast) {
        notif.clear(toast);
        _notifyUpdateOrCreate($scope.meta.is_new);
        
        if (isSave == true) {
            $location.path('/entity');
        }
        else {
            $route.reload();
        }
    }
    
    _init();
}]);
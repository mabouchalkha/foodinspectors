angular.module('starterApp').controller('IndexCtrl', ['$scope', 'viewModel', 'config', '$modal', '$location', function ($scope, viewModel, config, $modal, $location) {
    var _init = function () {
        $scope.data = viewModel.data;
        $scope.count = viewModel.meta.count;
        $scope.config = config;
        $scope.predicate = config.predicate;
        $scope.reverse = false;
        $scope.resource = config.resource;
        $scope.page = 0;
        $scope.searchValue = '';
    };

    $scope.create = function () {
        $location.path($location.path() + '/create');
    };

    $scope.goToEntity = function (item) {
        if (item !== null) {
            if (item[$scope.config.id] !== null) {
                $location.path($location.path() + '/' + item[$scope.config.id]);
            }
            else {
                throw 'Index listing cannot retrieve entity by id.'
            }
        }  
        else {
            throw 'Index listing need primary key in its confirugation'
        }
    };
    
    $scope.changePage = function (page) {
      $scope.page = page;
      _updateData($scope.predicate, $scope.reverse, $scope.page);
    };
    
    $scope.search = function (value) {
        $scope.page = 0;
        _updateData($scope.predicate, $scope.reverse, $scope.page);  
    };
    
    $scope.clearSearchValue = function () {
        $scope.searchValue = '';
        $scope.page = 0;
        _updateData($scope.predicate, $scope.reverse, $scope.page);
    };
    
    $scope.sort = function (col) {
        $scope.page = 0;
        if ($scope.predicate == col.field) {
            $scope.reverse = !$scope.reverse;
        }
        else {
            $scope.reverse = false;
            $scope.predicate = col.field
        }
        
        _updateData($scope.predicate, $scope.reverse);
    };
    
    var _updateData = function (predicate, reverse, page) {
        var popup = $modal.open({
            template: '<div id="loading" class="text-center"><i class="fa fa-spinner fa-spin fa-2x"></i> &nbsp Loading data</div>',
            backdrop: 'static',
            windowClass: "modal fade in"
        });
        $scope.resource.getList({ predicate: predicate, reverse: reverse, page: page, searchValue: $scope.searchValue }).$promise.then(function (resp) {
           $scope.data = resp.data;
           $scope.count = resp.meta.count;
           
           popup.dismiss();
        });
    };
    
    _init();
}]);
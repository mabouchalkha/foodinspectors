angular.module('starterApp').controller('IndexCtrl', ['$scope', 'viewModel', 'config', '$modal', function ($scope, viewModel, config, $modal) {
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
            backdrop: 'static'
        });
        $scope.resource.getList({ predicate: predicate, reverse: reverse, page: page, searchValue: $scope.searchValue }).$promise.then(function (resp) {
           $scope.data = resp.data;
           $scope.count = resp.meta.count;
           
           popup.dismiss();
        });
    };
    
    _init();
}]);
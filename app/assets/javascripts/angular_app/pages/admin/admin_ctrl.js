angular.module("starterApp").controller('AdminCtrl', ['$scope', 'viewModel', function($scope, viewModel) {
    var _init = function () {
        $scope.users = viewModel.data.data;
    };
    
    _init();
}]);
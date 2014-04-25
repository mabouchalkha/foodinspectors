starterApp.controller('AdminCtrl', ['$scope', '$http', function($scope, $http) {
    var _init = function () {
        $http.get('/admin').then(function(resp) {
            $scope.users = resp.data.data;
        });
    };
    
    _init();
}]);
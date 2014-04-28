angular.module("starterApp").controller('PrivateCtrl', ['$scope', '$http', function($scope, $http) {
    var _init = function () {
        $http.get('/private').then(function(resp) {
            $scope.roles = resp.data.data;
        });
    };
    
    _init();
}]);
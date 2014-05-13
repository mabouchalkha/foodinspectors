angular.module("starterApp").controller('StrapCtrl', ['$scope', function($scope) {
    var _init = function () {
        $scope.config = {};
        $scope.icons = [
            {value:"Gear",label:"<i class=\"fa fa-gear\"></i> Gear"},
            {value:"Globe",label:"<i class=\"fa fa-globe\"></i> Globe"},
            {value:"Heart",label:"<i class=\"fa fa-heart\"></i> Heart"},
            {value:"Camera",label:"<i class=\"fa fa-camera\"></i> Camera"}
        ];
        $scope.data = [
            {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
            {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
            {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
        ];
    
        $scope.gridOptions = { data: 'data' };
    };
    
    _init();
}]);
angular.module('services.userService', ['restangular'])
    .factory('User', ['Restangular', function (Restangular) {
        return Restangular.service('users');
    }]);
						
					
//'use strict';

angular.module('starterApp').factory('userResource', ['$resource', function ($resource) {
    return $resource('', {}, {
        getList: {
            method: 'GET', url: '/user'
        },
    });
}]);

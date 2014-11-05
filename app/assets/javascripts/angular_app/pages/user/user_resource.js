//'use strict';

angular.module('starterApp').factory('userResource', ['$resource', function ($resource) {
    return $resource('', {}, {
        index: {
            method: 'GET', url: '/user'
        },
        read: {
            method: 'GET', url: '/user/:id'
        },
        create: {
            method: 'POST', url: '/user'
        },
        update: {
            method: 'PUT', url: '/user'
        },
        delete: {
            method: 'DELETE', url: '/user/:id'
        }
    });
}]);
//'use strict';

angular.module('starterApp').factory('userResource', ['$resource', function ($resource) {
    return $resource('', {}, {
        getList: {
            method: 'GET', url: '/user'
        },
        getOne: {
            method: 'GET', url: '/user/:id'
        },
        getNew: {
            method: 'GET', url: '/user/new'
        },
        save: {
            method: 'PUT', url: '/user'
        },
        delete: {
            method: 'DELETE', url: '/user/:id'
        }
    });
}]);
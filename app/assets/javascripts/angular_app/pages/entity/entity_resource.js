//'use strict';

angular.module('starterApp').factory('entityResource', ['$resource', function ($resource) {
    return $resource('', {}, {
        getList: {
            method: 'GET', url: '/entity'
        },
        getOne: {
            method: 'GET', url: '/entity/:id'
        },
        getNew: {
            method: 'GET', url: '/entity/new'
        },
        save: {
            method: 'PUT', url: '/entity'
        },
        delete: {
            method: 'DELETE', url: '/entity/:id'
        }
    });
}]);
//'use strict';

angular.module('starterApp').factory('payementTermResource', ['$resource', function ($resource) {
    return $resource('', {}, {
        getList: {
            method: 'GET', url: '/payementTerm'
        },
        getOne: {
            method: 'GET', url: '/payementTerm/:id'
        },
        getNew: {
            method: 'GET', url: '/payementTerm/new'
        },
        save: {
            method: 'PUT', url: '/payementTerm'
        },
        delete: {
            method: 'DELETE', url: '/payementTerm/:id'
        }
    });
}]);
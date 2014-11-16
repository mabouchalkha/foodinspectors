//'use strict';

angular.module('starterApp').factory('payementTermResource', ['$resource', function ($resource) {
    return $resource('', {}, {
        index: {
            method: 'GET', url: '/payementTerm'
        },
        read: {
            method: 'GET', url: '/payementTerm/:id'
        },
        update: {
            method: 'PUT', url: '/payementTerm'
        },
        create: {
            method: 'POST', url: '/payementTerm'
        },
        delete: {
            method: 'DELETE', url: '/payementTerm/:id'
        }
    });
}]);
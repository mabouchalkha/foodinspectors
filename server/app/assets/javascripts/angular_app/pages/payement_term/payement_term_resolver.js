angular.module('starterApp').constant('payementTermResolver', {
    resolveIndex: {
        viewModel: ['payementTermResource', function (payementTermResource) {
            return payementTermResource.index({limit: 2, predicate: 'name'}).$promise.then()
        }],
        config: ['payementTermResource', function (payementTermResource) {
            return {
                name: 'Payement term',
                id: 'id',
                entity: 'payementTerms',
                columns: [{name: 'Name', field: 'name'}, {name: 'Due in days', field: 'due_in_days'}],
                predicate: 'name',
                resource: payementTermResource,
                pageLimit: 20,
                createLink: true
            }
        }]
    },
    resolve: {
        viewModel: ['payementTermResource', '$route', function (payementTermResource, $route) {
            var id = $route.current.params.id || 'new';
            return payementTermResource.read({id: id}).$promise.then();
        }]
    }
});
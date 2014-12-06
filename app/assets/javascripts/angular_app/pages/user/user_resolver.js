angular.module('starterApp').constant('userResolver', {
    resolveIndex: {
        viewModel: ['userResource', function (userResource) {
            return userResource.index({predicate: 'email'}).$promise.then()
        }],
        config: ['userResource', function (userResource) {
            return {
                name: 'User',
                id: 'id',
                entity: 'users',
                columns: [{name: 'Email', field: 'email'}, {name: 'First Name', field: 'first_name'}, {name: 'Last Name', field: 'last_name'}],
                predicate: 'email',
                resource: userResource,
                createLink: true
            }
        }]
    },
    resolve: {
        viewModel: ['userResource', '$route', function (userResource, $route) {
            var id = $route.current.params.id || 'new';
            return userResource.read({id: id}).$promise.then();
        }]
    }
});
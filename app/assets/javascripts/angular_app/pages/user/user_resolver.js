angular.module('starterApp').constant('userResolver', {
    resolveIndex: {
        viewModel: ['userResource', function (userResource) {
            return userResource.getList({limit: 2, predicate: 'email'}).$promise.then()
        }],
        config: ['userResource', function (userResource) {
            return {
                name: 'User',
                id: 'id',
                entity: 'users',
                columns: [{name: 'Email', field: 'email'}, {name: 'First Name', field: 'first_name'}, {name: 'Last Name', field: 'last_name'}],
                predicate: 'email',
                resource: userResource,
                pageLimit: 2,
                createLink: true
            }
        }]
    },
    resolve: {
        viewModel: ['userResource', '$route', function (userResource, $route) {
            var id = $route.current.params.id;
            
            if (id == null) {
                return userResource.getNew().$promise.then();
            }
            else {
                return userResource.getOne({id: id}).$promise.then();   
            }
        }]
    }
});
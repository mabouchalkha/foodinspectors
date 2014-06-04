angular.module('starterApp').constant('entityResolver', {
    resolveIndex: {
        viewModel: ['entityResource', function (entityResource) {
            return entityResource.getList({limit: 2, predicate: 'name'}).$promise.then()
        }],
        config: ['entityResource', function (entityResource) {
            return {
                name: 'Entity',
                id: 'id',
                entity: 'entity',
                columns: [{name: 'Name', field: 'name'}],
                predicate: 'name',
                resource: entityResource,
                pageLimit: 20,
                createLink: true
            }
        }]
    },
    resolve: {
        viewModel: ['entityResource', '$route', function (entityResource, $route) {
            var id = $route.current.params.id;
            
            if (id == null) {
                return entityResource.getNew().$promise.then();
            }
            else {
                return entityResource.getOne({id: id}).$promise.then();   
            }
        }]
    }
});
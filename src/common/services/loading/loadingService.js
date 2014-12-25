angular.module('common.services.loading', [])
	.factory('LoadingService', ['$rootScope', function ($rootScope) {		
	
		$rootScope.loadingView = false;
		// The public API of the service
		var loadingService = {
			setLoading: setLoading
		};

		return loadingService;
		
		function setLoading(isLoading){
			$rootScope.loadingView = isLoading;
		};
		
	}]);
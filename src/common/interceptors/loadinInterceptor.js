angular.module('common.interceptors.loadingInterceptor', ['common.services.loading'])
	.factory('LoadingInterceptor', ['LoadingService', function (LoadingService) {
		
		var loadingInterceptor = {
			request: enableLoading,
			response: disableLoading
		};
		
		return loadingInterceptor;
		
		function enableLoading(req) {
			LoadingService.setLoading(true);
			return req;
		};
		
		function disableLoading(response) {
			LoadingService.setLoading(false);
			return response;
		};
    
}]);
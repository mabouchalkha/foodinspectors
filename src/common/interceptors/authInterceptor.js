angular.module('common.interceptors.authInterceptor', ['common.services.authentication.authService'])
	.factory('AuthInterceptor', ['$q', 'AuthService', function ($q, AuthService) {
			
		var authInterceptor = {
			request: addTokenWithUser,
			requestError: requestError
		};
		
		return authInterceptor;

		function addTokenWithUser(req) {
			return $q(function(resolve, reject) {
				AuthService.currentUser().then(function(user) {
					if(user) {
						req.params = req.params || {};
						req.params['auth_token'] = req.params['auth_token'] || user.auth_token;
						req.params['auth_user_id'] = req.params['auth_user_id'] || user.id;
						resolve( req );
					} else {
						resolve( req );
					}
				});
			});
		};

		function requestError(reqErr) {
			return reqErr;
		};

	}]);
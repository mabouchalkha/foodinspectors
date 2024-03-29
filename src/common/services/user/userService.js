angular.module('common.services.user.userService', [
	'ngCookies',
	'common.services.authentication.authService',
	'common.models.user'
])
.factory('UserService', ['$q', '$cookieStore', '$rootScope', '$http', 'AuthService', 'User', 'API_CONF',
	function ($q, $cookieStore, $rootScope, $http, AuthService, User, API_CONF) {			
		
		var userService = {
			login: function (userParams) {
				var d = $q.defer();

				$http({
					url: API_CONF.apiUrl + 'users/sign_in',
					method: 'POST',
					data: {
						user: userParams
					}
				}).success(function(response) { 
					if(response.success) {
						var user = response.data.user;
						user.auth_token = response.data.auth_token;

						AuthService.setCurrentUser(user);

						d.resolve(user);
					} else {
						d.reject(response);
					}
				}).error(function(reason) { 
					d.reject(reason);
				});
				return d.promise;
			},
			logout: function () {
				return $q(function(resolve, reject) {
					//TODO call logout in devise
					AuthService.removeCurrentUser();
					resolve( );
					reject( );
				});
			},
			signup: function (userParams) {
				var d = $q.defer();

				$http({
					url: API_CONF.apiUrl + 'users',
					method: 'POST',
					data: {
						user: userParams
					}
				}).success(function(response) {
					var user = response.data.user;
					user.auth_token = response.data.auth_token; // talk about this

					AuthService.setCurrentUser(user);

					d.resolve(user);
				}).error(function(reason) {
					d.reject(reason);
				});
				return d.promise;
			},
			currentUser: AuthService.currentUser
		};
	
		return userService;
	
}]);
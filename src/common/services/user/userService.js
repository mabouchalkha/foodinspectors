angular.module('common.services.user.userService', [
	'ngCookies',
	'common.services.authentication.authService',
	'common.models.user'
])
.factory('UserService', ['$q', '$cookieStore', '$rootScope', '$http', 'AuthService', 'User',
	function ($q, $cookieStore, $rootScope, $http, AuthService, User) {
					
		
		var userService = {
			login: login,
			logout: logout,
			signup: signup,
			currentUser: AuthService.currentUser
		};
	
		return userService;
	
		function login(userParams) {
			var d = $q.defer();

			$http({
				url: 'http://foodinspector-185594.usw1-2.nitrousbox.com:3444/users/sign_in',
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
		};
	
		function logout() {
			return $q(function(resolve, reject) {
				//TODO call logout in devise
				AuthService.removeCurrentUser();
				resolve( );
				reject( );
			});
		};
	
		function signup(userParams) {
			var d = $q.defer();

			$http({
				url: 'http://foodinspector-185594.usw1-2.nitrousbox.com:3444/accounts',
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
		};
}]);
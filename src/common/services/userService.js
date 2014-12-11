angular.module('common.services.userService', [
	'ngCookies',
	'common.services.authService',
	'common.models.user'
	])
	.factory('UserService', ['$q', '$cookieStore', '$rootScope', '$http', 'AuthService', 'User',
						function ($q, $cookieStore, $rootScope, $http, AuthService, User) {
					
							var userService = {
								login: login,
								logout: logout,
								signup: signup
							};
	
							return userService;
	
							function login(userParams) {
								return $q(function(resolve, reject) {
									//Call post to api to sign in a user.
									User.post().then(function(response){
										if(response.success) {
											var user = response.data.user;
											user.auth_token = response.data.auth_token; 
					
											AuthService.setCurrentUser(user);
					
											resolve( user );
										} else {
											reject( response );
										}
									});
								});
							};
	
							function logout() {
								return $q(function(resolve, reject) {
									AuthService.removeCurrentUser();
									resolve( );
									reject( );
								});
							};
	
							function signup(userParams) {
										var d = $q.defer();

										$http({
											url: 'http://localhost:3000/api/v1/users',
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
								// return $q(function(resolve, reject) {
									
								// 	User.create(userParams).then(function(response){
								// 		var user = response.data.user;
								// 		user.auth_token = response.data.auth_token;
					
								// 		AuthService.setCurrentUser(user);
								// 		resolve( user );
								// 	});
								// });
							};

						}]
	);
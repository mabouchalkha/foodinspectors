angular.module('app.services.userService', [])
	.factory('UserService', ['$q', '$cookieStore', '$rootScope', 'AuthService', 'User',
						function ($q, $cookieStore, $rootScope, AuthService, User) {
					
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
					
											resolve({ user });
										} else {
											reject({ response });
										}
									});
								});
							};
	
							function logout() {
								return $q(function(resolve, reject) {
									AuthService.removeCurrentUser();
									resolve({ });
									reject({ });
								});
							};
	
							function signup(userParams) {
								return $q(function(resolve, reject) {
									
									User.post().then(function(response){
										var user = response.data.user;
										user.auth_token = response.data.auth_token;
					
										AuthService.setCurrentUser(user);
										resolve({ user });
									});
								});
							};

						}]
	);
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
								signup: signup
							};
	
							return userService;
	
							function login(userParams) {
								var d = $q.defer();

								$http({
									url: '/users/sign_in',
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
								// return $q(function(resolve, reject) {
								// 	//Call post to api to sign in a user.
								// 	User.post().then(function(response){
								// 		if(response.success) {
								// 			var user = response.data.user;
								// 			user.auth_token = response.data.auth_token; 
					
								// 			AuthService.setCurrentUser(user);
					
								// 			resolve( user );
								// 		} else {
								// 			reject( response );
								// 		}
								// 	});
								// });
							};
	
							function logout() {
								return $q(function(resolve, reject) {
									AuthService.removeCurrentUser();
									resolve( );
									reject( );
								});
							};
	
							function signup(userParams) {
										// var d = $q.defer();

										// $http({
										// 	url: 'http://127.0.0.1:3000/users',
										// 	method: 'POST',
										// 	data: {
										// 		user: userParams
										// 	}
										// }).success(function(response) { 
										// 	var user = response.data.user;
										// 	user.auth_token = response.data.auth_token; // talk about this

										// 	AuthService.setCurrentUser(user);

										// 	d.resolve(user);
										// }).error(function(reason) { 
										// 	d.reject(reason);
										// });
										// return d.promise;
								return $q(function(resolve, reject) {

										var u = User.create(userParams);
									
									// User.createCustom(userParams).then(function(response){
									// 	var user = response.data.user;
									// 	user.auth_token = response.data.auth_token;
					
									// 	AuthService.setCurrentUser(user);
									// 	resolve( user );
									// });
								});
							};

						}]
	);
angular.module('services.userService', [])
	.factory('UserService', ['$q', '$cookieStore', '$rootScope', 'AuthService',
						function ($q, $cookieStore, $rootScope, AuthService) {
						
					
						var userService = {
							login: login,
							logout: logout,
							signup: signup
						};

						return userService;

						function login(userParams) {
							return $q(function(resolve, reject) {

								resolve({ });
								reject({ });

							});
						};

						function logout() {
							return $q(function(resolve, reject) {

								resolve({ });
								reject({ });

							});
						};

						function signup(userParams) {
							return $q(function(resolve, reject) {

								resolve({ });
								reject({ });

							});
						};

						}]
	);
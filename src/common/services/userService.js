angular.module('services.userService', [])
	.factory('UserService', ['$q', '$cookieStore', '$rootScope', '$http', 'AuthService',
						function ($q, $cookieStore, $rootScope, $http, AuthService) {
						
					
						var userService = {
							login: login,
							logout: logout,
							singup: singup
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
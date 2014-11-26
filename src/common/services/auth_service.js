angular.module('services.authService', [])
	.factory('AuthService', ['$q', '$cookieStore', '$rootScope', 
					function ($q, $cookieStore, $rootScope) {

						var _user = null;
	
						var service = {
							setCurrentUser: setCurrentUser,
							removeCurrentUser: removeCurrentUser,
							currentUser: currentUser
						};

						return service;
						
						function setCurrentUser(user) {
							_user = user;
							$cookieStore.put('user', user);
							$rootScope.$broadcast("user:set", user);
						};

						function removeCurrentUser() {
							_user = null;
							$cookieStore.remove('user');
							$rootScope.$broadcast("user:unset");
						};

						function currentUser() {
							return $q(function(resolve, reject) {
								if(_user){
									resolve({ _user; });
								} else if($cookieStore.get('user')) {
									_user = $cookieStore.get('user');
									$rootScope.$broadcast("user:set", _user);
									resolve({ _user; });
								} else{
									resolve({ null; });
								}
							});
						};

					}]
	);
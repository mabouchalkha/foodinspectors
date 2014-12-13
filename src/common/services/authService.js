angular.module('common.services.authService', [])
	.factory('AuthService', ['$q', '$cookieStore', '$rootScope', 
					function ($q, $cookieStore, $rootScope) {

						var _user = null;
	
						// The public API of the service
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
									resolve( _user );
								} else if($cookieStore.get('user')) {
									_user = $cookieStore.get('user');
									$rootScope.$broadcast("user:set", _user);
									resolve( _user );
								} else{
									resolve( null );
								}
							});
						};

					}])
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
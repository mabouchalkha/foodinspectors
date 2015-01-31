angular.module('common.services.authentication.authService', [
	'common.services.permission.permissionService'
	])
	.factory('AuthService', ['$q', '$cookieStore', '$rootScope', 'Permission',
					function ($q, $cookieStore, $rootScope, Permission) {

						var _user = null;
						var _accessLevels = Permission.accessLevels;
						var _userRoles = Permission.userRoles;
	
						// The public API of the service
						var service = {
							authorize : function(accessLevel, role) {
				            if(role === undefined) {
				                role = _user.role;
				            }
				            
            				return accessLevel.bitMask & role.bitMask;
			            },
							isLoggedIn: function(user) {
								if(user === undefined) {
									currentUser().then(function (currentUser){
										if (!user) {
											user = currentUser;
										}
									});
								}
								return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
							},
							setCurrentUser: function (user) {
								_user = user;
								$cookieStore.put('user', user);
								$rootScope.$broadcast("user:set", user);
							},
							removeCurrentUser: function () {
								_user = null;
								$cookieStore.remove('user');
								$rootScope.$broadcast("user:unset");
							},
							currentUser: function () {
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
							}
						};

						return service;

					}])
.factory('AuthInterceptor', ['$q', 'AuthService', '$state', function ($q, AuthService, $state) {
			
			var authInterceptor = {
				request: function (req) {
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
				},
				requestError: function (reqErr) {
					return reqErr;
				},
				responseError: function(response) {
                if(response.status === 401 || response.status === 403) {
                    $state.go('auth.login');
                }
                return $q.reject(response);
            }
			};
		
			return authInterceptor;





		}]);
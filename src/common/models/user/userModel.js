angular.module('common.models.user', [
	'restangular'
	])
	    .factory('User', ['$rootScope', 'API', 'Restangular', function ($rootScope, API, Restangular) {
	
	    	   //var userResource = API.all('users');
	    	   var userResource = API.service('users');
	
	    	   var User = {
	    			read: read,
	    			getById: getById,
	    			create: create,
	    			update: update, 
		        	getUsers: getUsers,
		        	createCustom: createCustom,
		        	resource: resource
			   };
			   
			   return User;
	
			   function read(params) {
			   	$rootScope.broadcast('users.read');
			   	return userRessource.getlist(params);
			   }
	
			   function getById(id) {
			   	$rootScope.broadcast('users.getById');
			   	return userRessource.get(id);
			   }
	
			   function create(user) {
			   	userResource.post(user).then(function() {
			   		$rootScope.broadcast('users.create');
			   	});
			   }
	
			   function update(user) {
			   	user.put().then(function() {
			   		$rootScope.broadcast('users.update');
			   	});
			   }
	
			   function getUsers() {
		   	   return Restangular.one('users').getList();
			   }
	
			   function createCustom(customData) {
			   	return Restangular.one('users').customPOST(customData);
			   }
	
			   function resource() {
			   	return Restangular.service('users');
			   }
	    }]);
						
					
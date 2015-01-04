angular.module('common.models.contact', [
	'restangular',
	'common.models.api'
	])
	    .factory('Contact', ['$rootScope', 'API', 'Restangular', function ($rootScope, API, Restangular) {
	
	    	   var contactResource = API.all('contacts');
	    	   //var contactResource = API.service('users');
	
	    	   var User = {
	    			read: read,
	    			getById: getById,
	    			create: create,
	    			update: update, 
		        	createCustom: createCustom,
		        	resource: resource
			   };
			   
			   return User;
	
			   function read(params) {
			   	$rootScope.broadcast('contacts.read');
			   	return contactResource.getlist(params);
			   }
	
			   function getById(id) {
			   	$rootScope.broadcast('contacts.getById');
			   	return contactResource.get(id);
			   }
	
			   function create(contact) {
			   	contactResource.post(contact);
			   	// .then(function() {
			   	// 	$rootScope.broadcast('contacts.create');
			   	// });
			   }
	
			   function update(contact) {
			   	contact.put().then(function() {
			   		$rootScope.broadcast('contacts.update');
			   	});
			   }
	
			   function getContacts() {
		   	   return Restangular.one('contacts').getList();
			   }
	
			   function createCustom(customData) {
			   	return API.one('contacts').customPOST(customData);
			   }
	
			   function resource() {
			   	return Restangular.service('contacts');
			   }
	    }]);
						
					
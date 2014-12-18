angular.module('common.services.contact.contactService', [
	'common.models.contact'
	])
	.factory('ContactService', ['$q', '$rootScope', '$http', 'AuthService', 'Contact',
						function ($q, $rootScope, $http, AuthService, Contact) {
					
							var contactService = {
								create: create
							};
	
							return contactService;
	
							function create(contactParams) {
								return $q(function(resolve, reject) {

									var c = Contact.create(contactParams);
						
								});
							};

						}]
	);
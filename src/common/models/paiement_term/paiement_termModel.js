angular.module('common.models.paiement_term', [
	'restangular',
	'common.models.api'
	])
	    .factory('PaiementTerm', ['$rootScope', 'API', 'Restangular', function ($rootScope, API, Restangular) {
	    	   var paiementTermResource = API.all('paiement_terms');
	
	    	   var pt = {
              list: function (params) {
                $rootScope.$broadcast('paiement_terms.read');
                return paiementTermResource.getlist(params);
              },
              read: function (id) {
                return paiementTermResource.get(id).then(function (resp) {
                  $rootScope.$broadcast('paiement_terms.getById');
                  return resp;
                });
              },           
           };
			   
			     return pt;
  }]);
						
					
angular.module('common.models.api', [
	'restangular'
	])
	    .factory('API', ['Restangular', function(Restangular) {
	        return Restangular.withConfig(function(RestangularProvider) {
	            
	           RestangularProvider.setBaseUrl('http://127.0.0.1:3000/');

              RestangularProvider.addFullRequestInterceptor(function(elem, operation, what) {
                  var retElem = elem;
                  if (operation === 'post' || operation === 'put') {
                      var wrapper = {};
                      wrapper[what.substring(0, what.length -1)] = elem; 
                     retElem = wrapper;
                  }
                  else if (operation === "remove") {
                     return undefined;
                  } 
                  return retElem;
              });
	            // add a response intereceptor
                RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                  var extractedData;
                  // .. to look for getList operations
                  if (operation === "getList") {
                    // .. and handle the data and meta data
                    extractedData = data.objects
                    extractedData.meta = _.omit(data, 'objects');
                  } else {
                    extractedData = data;
                  }
                  return extractedData;
                });
	            
	            
	           // Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            //         if(response.status === 403) {
            //             refreshAccesstoken().then(function() {
            //                 // Repeat the request and then call the handlers the usual way.
            //                 $http(response.config).then(responseHandler, deferred.reject);
            //                 // Be aware that no request interceptors are called this way.
            //             });
                
            //             return false; // error handled
            //         }
                
            //         return true; // error not handled
            //     });
	        });
	    }]);
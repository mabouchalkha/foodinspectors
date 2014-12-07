angular.module('authentication.signup')
    .controller('SignupController', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
			var signup = this;

			signup.registerParams = {};

			signup.submitSignup = submitSignup;

			

         function submitSignup() {
        		UserService.signup(signup.registerParams).then(
        			function(user) {
        				signup.user = user;
        				$location.path("/");
        			},
        			function(reason){
        				var error = reason;
        			});
        };
  
        
    }]);
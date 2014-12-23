   angular.module('authentication.signup')
      .controller('SignupController', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
   		var signup = this;

         signup.brand = 'Food Inspectors';
			signup.registerParams = { email:'', password:''};

			signup.submitSignup = submitSignup;
			signup.getPasswordType = getPasswordType;
         signup.hasErrorClass = hasErrorClass;
         signup.showMessages = showMessages;
         signup.clearForm = clearForm;
   			

         function submitSignup () {
       		UserService.signup(signup.registerParams).then(
       			function(user) {
       				signup.user = user;
       				$location.path("/");
       			},
       			function(reason){
       				var error = reason;
       		   }
            );
         };
     
		   function getPasswordType () {
		      return signup.signupForm.showPassword ? 'text' : 'password';
		   };
			
         function showMessages (field) {
            return signup.signupForm[field].$touched || signup.signupForm.$submitted
         };

         function clearForm () {
            ctrl.newCustomer = { email:'', userName:'', password:'' }
            ctrl.signupForm.$setUntouched();
            ctrl.signupForm.$setPristine();
         };

         function hasErrorClass (field) {
            return signup.signupForm[field].$touched && signup.signupForm[field].$invalid;
         };
           
       }]);
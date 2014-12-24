angular.module('authentication')
.controller('AuthenticationController', ['$location', 'UserService', function ($location, UserService) {
	var auth = this;
			
	auth.signup = { email:'', password:'' };
	auth.login  = { email:'', password:'' };
			
	auth.brand = 'Food Inspectors';

	auth.submitSignup = submitSignup;
	auth.submitLogin = submitLogin;
	auth.getPasswordType = getPasswordType;
	auth.hasErrorClass = hasErrorClass;
	auth.showMessages = showMessages;
	auth.clearForm = clearForm;
   			

	function submitSignup () {
		UserService.signup(auth.signup).then(
			function(user) {
				auth.user = user;
				$location.path("/");
			},
			function(reason){
				var error = reason;
			}
		);
	};
			
	function submitLogin () {
		UserService.login(auth.login).then(
			function(user){
				auth.user = user;
				$location.path("/");
			},
			function(reason){
				auth.login.erorrs = reason;
			}
		);
	};
     
	function getPasswordType () {
		return auth.authForm.showPassword ? 'text' : 'password';
	};
			
	function showMessages (field) {
		return auth.authForm[field].$touched || auth.authForm.$submitted
	};

	function clearForm () {
		ctrl.newCustomer = { email:'', userName:'', password:'' }
		ctrl.authForm.$setUntouched();
		ctrl.authForm.$setPristine();
	};

	function hasErrorClass (field) {
		return auth.authForm[field].$touched && auth.authForm[field].$invalid;
	};
           
}]);
angular.module('authentication')
.controller('AuthenticationController', ['$state', 'UserService', 'Permission', function ($state, UserService, Permission) {
	var vm = this;
			
	var _init = function () {

		vm.signup = { name:'', subdomain:'', owner_attributes:{email:'', password:''}/*, role: Permission.userRoles.admin*/};
		vm.login  = { email:'', password:'' };
			
		vm.brand = 'Food Inspectors';
	};

	vm.submitSignup = function () {
		UserService.signup(vm.signup).then(
			function(user) {
				vm.user = user;
				$state.go('home.index');
			},
			function(reason){
				var error = reason;
			}
		);
	};

	vm.submitLogin = function () {
		UserService.login(vm.login).then(
			function(user){
				vm.user = user;
				$state.go('home.index');
			},
			function(reason){
				vm.login.erorrs = reason;
			}
		);
	};


	// UX for form
	vm.getPasswordType = function () {
		return vm.authForm.showPassword ? 'text' : 'password';
	};

	vm.hasErrorClass = function (field) {
		return vm.authForm[field].$touched && vm.authForm[field].$invalid;
	};

	vm.showMessages = function (field) {
		return vm.authForm[field].$touched || vm.authForm.$submitted
	};

	vm.clearForm = function () {
		ctrl.newCustomer = { email:'', userName:'', password:'' }
		ctrl.authForm.$setUntouched();
		ctrl.authForm.$setPristine();
	};

	_init();
           
}]);
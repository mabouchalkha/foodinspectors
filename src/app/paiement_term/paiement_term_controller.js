angular.module('paiement_term').controller('PaiementTermController', ['viewModel', function (viewModel) {
  var vm = this;
  
  var _init = function () {
    vm.data = viewModel.data;
    vm.meta = viewModel.meta;
  }
  
  _init();
}]);
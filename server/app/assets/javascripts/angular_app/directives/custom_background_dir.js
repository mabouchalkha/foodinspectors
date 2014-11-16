angular.module("starterApp").directive('customBackground', ['$location', function($location) {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
        var path = function () {
            return $location.path();
        }
        
        var addBg = function (path) {
            element.removeClass('body-home body-special body-tasks body-lock');
            switch (path) {
                case '/':
                  return element.addClass('body-home');
                case '/404':
                case '/500':
                case '/login':
                  return element.addClass('body-special');
                case '/lock-screen':
                  return element.addClass('body-special body-lock');
                case '/tasks':
                  return element.addClass('body-tasks');
              }
            };
            
            addBg($location.path());
            
            scope.$watch(path, function (newValue, oldValue) {
                if (newValue === oldValue) return;
                
                return addBg($location.path());
            })
        }
    }
}]);

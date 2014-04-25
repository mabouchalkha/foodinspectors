var starterApp = angular.module("starterApp", ['ngRoute', 'templates']);

/*starterApp.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}]);*/

starterApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
        .when('/', { templateUrl: 'angular_app/pages/home.html'})
        .when('/login', { templateUrl: 'angular_app/pages/login/login.html', controller: 'LoginCtrl'})
        .when('/private', { templateUrl: 'angular_app/pages/private/private.html', controller: 'PrivateCtrl'})
        .when('/admin', { templateUrl: 'angular_app/pages/admin/admin.html', controller: 'AdminCtrl'})
        .otherwise({ redirectTo: '/' });
        
    var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
    var success = function (response) {
      return response;
    };

    var error = function (response) {
      if (response.status === 401) {
        //redirect them back to login page
        $location.path('/login');

        return $q.reject(response);
      } 
      else {
        return $q.reject(response);
      }
    };

    return function (promise) {
      return promise.then(success, error);
    };
  }];

  $httpProvider.responseInterceptors.push(logsOutUserOn401);
}]);

starterApp.run(function ($rootScope, $location, Session) {

  var anonRoutes = ['/login', '/'];
  var userRoutes = ['/private'];
  var adminRoutes = ['/admin'];

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (anonRoutes.indexOf($location.url()) == -1 && !Session.isAuthenticated()) {
      $location.path('/login');
    }
    else if(Session.isAuthenticated()) {
        var mask = Session.currentUser.roles_mask;
        
        if (mask > 1 && adminRoutes.indexOf($location.url()) != -1) {
            $location.path('/');
        }
    }
  });
});


angular.module("starterApp", ['ngRoute', 'templates', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'ngCookies']);

angular.module("starterApp").config(['$routeProvider', '$httpProvider', '$injector', function($routeProvider, $httpProvider, $injector) {
    $routeProvider
        /* HOME */
        .when('/', { templateUrl: 'angular_app/pages/home.html'})
        
        /* USERS */
        .when('/user', { templateUrl: 'angular_app/pages/index/index.html', controller: 'IndexCtrl', resolve: $injector.get('userResolver').resolveIndex })
        .when('/user/create', { templateUrl: 'angular_app/pages/user/edit.html', controller: 'UserCtrl', resolve: $injector.get('userResolver').resolve })
        .when('/user/:id', { templateUrl: 'angular_app/pages/user/edit.html', controller: 'UserCtrl', resolve: $injector.get('userResolver').resolve })
        .when('/login', { templateUrl: 'angular_app/pages/login/login.html', controller: 'LoginCtrl'})

        /* COMPANY*/
        .when('/company', { templateUrl: 'angular_app/pages/index/index.html', controller: 'IndexCtrl', resolve: $injector.get('companyResolver').resolveIndex })
        .when('/company/create', { templateUrl: 'angular_app/pages/company/edit.html', controller: 'CompanyCtrl', resolve: $injector.get('companyResolver').resolve })
        .when('/company/:id', { templateUrl: 'angular_app/pages/company/edit.html', controller: 'CompanyCtrl', resolve: $injector.get('companyResolver').resolve })

        /* GLOBAL */
        .when('/private', { templateUrl: 'angular_app/pages/private/private.html', controller: 'PrivateCtrl', resolve: privateResolver.resolve })
        .when('/admin', { templateUrl: 'angular_app/pages/admin/admin.html', controller: 'AdminCtrl', resolve: adminResolver.resolve})
        .when('/404', { templateUrl: 'angular_app/pages/404.html'})
        
        .otherwise({ redirectTo: '/404' });
        
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

angular.element(document).ready(function() {
    var req = $.ajax({ url: '/current_user' });
    req.done(function (resp) {
        var app = angular.bootstrap(document, ["starterApp"]);
        var session = app.get('Session');
        var root = app.get('$rootScope');
        var $location = app.get('$location');
        
        if (resp.data) {
          session.currentUser = resp.data;
        }
        else {
          session.currentUser = null;
        }
        
        var anonRoutes = ['/login', '/register', '/404', '/'];
        var userRoutes = ['/private', '/lock'];
        var adminRoutes = ['/admin', '/user'];
        
        root.$on('$routeChangeStart', function (event, next, current) {
            if (anonRoutes.indexOf($location.url()) == -1 && !session.isAuthenticated()) {
                $location.path('/login');
            }
            else if(session.isAuthenticated()) {
                var mask = session.currentUser.roles_mask;
            
                if (mask > 1 && adminRoutes.indexOf($location.url()) != -1) {
                    $location.path('/');
                }
            }
        });
          
        root.$apply();
    });
    
    req.fail(function (resp) {
       var app = angular.bootstrap(document, ["starterApp"]);
        var session = app.get('Session');
        var root = app.get('$rootScope');
        var $location = app.get('$location');
        

        session.currentUser = null;
        
        
        var anonRoutes = ['/login', '/register', '/404', '/'];
        var userRoutes = ['/private', '/lock'];
        var adminRoutes = ['/admin', '/user'];
        
        root.$on('$routeChangeStart', function (event, next, current) {
            if (anonRoutes.indexOf($location.url()) == -1 && userRoutes.indexOf($location.url()) == -1 && adminRoutes.indexOf($location.url()) == -1) {
                $location.path('/404');
            }
            
            if (anonRoutes.indexOf($location.url()) == -1 && !session.isAuthenticated()) {
                $location.path('/login');
            }
            else if(session.isAuthenticated()) {
                var mask = session.currentUser.roles_mask;
            
                if (mask > 1 && adminRoutes.indexOf($location.url()) != -1) {
                    $location.path('/');
                }
            }
        });
          
        root.$apply();
    });
});

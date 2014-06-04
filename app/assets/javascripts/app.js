angular.module("starterApp", ['ngRoute', 'templates', 'ngResource', 'ngSanitize', 'ui.bootstrap', 'ngCookies', 'toastr']);

angular.module("starterApp").config(['$routeProvider', '$httpProvider', '$injector', function($routeProvider, $httpProvider, $injector) {
    $routeProvider
        /* HOME */
        .when('/', { templateUrl: 'angular_app/pages/home.html'})
        
        /* USERS */
        .when('/user', { templateUrl: 'angular_app/pages/index/index.html', controller: 'IndexCtrl', resolve: $injector.get('userResolver').resolveIndex })
        .when('/user/:id', { templateUrl: 'angular_app/pages/user/user.html', controller: 'UserCtrl', resolve: $injector.get('userResolver').resolve })
        .when('/user/new', { templateUrl: 'angular_app/pages/user/user.html', controller: 'UserCtrl', resolve: $injector.get('userResolver').resolve })
        .when('/login', { templateUrl: 'angular_app/pages/login/login.html', controller: 'LoginCtrl'})

        /* PAYEMENT_TERM */
        .when('/payementTerm', { templateUrl: 'angular_app/pages/index/index.html', controller: 'IndexCtrl', resolve: $injector.get('payementTermResolver').resolveIndex })
        .when('/payementTerm/:id', { templateUrl: 'angular_app/pages/payement_term/payement_term.html', controller: 'PayementTermCtrl', resolve: $injector.get('payementTermResolver').resolve })
        .when('/payementTerm/new', { templateUrl: 'angular_app/pages/payement_term/payement_term.html', controller: 'PayementTermCtrl', resolve: $injector.get('payementTermResolver').resolve })

        /* ENTITY */
        .when('/entity', { templateUrl: 'angular_app/pages/index/index.html', controller: 'IndexCtrl', resolve: $injector.get('entityResolver').resolveIndex })
        .when('/entity/:id', { templateUrl: 'angular_app/pages/entity/entity.html', controller: 'EntityCtrl', resolve: $injector.get('entityResolver').resolve })
        .when('/entity/new', { templateUrl: 'angular_app/pages/entity/entity.html', controller: 'EntityCtrl', resolve: $injector.get('entityResolver').resolve })

        /* COMPANY*/
        //.when('/company', { templateUrl: 'angular_app/pages/index/index.html', controller: 'IndexCtrl', resolve: $injector.get('companyResolver').resolveIndex })
        //.when('/company/create', { templateUrl: 'angular_app/pages/company/edit.html', controller: 'CompanyCtrl', resolve: $injector.get('companyResolver').resolve })
        //.when('/company/:id', { templateUrl: 'angular_app/pages/company/edit.html', controller: 'CompanyCtrl', resolve: $injector.get('companyResolver').resolve })

        /* GLOBAL */
        .when('/404', { templateUrl: 'angular_app/pages/404.html'})
        
        .otherwise({ redirectTo: '/404' });
        
    var toast;   
    var responseInterceptor = ['$q', '$location', '$injector', '$rootScope', function ($q, $location, $injector, $rootScope) {
        var success = function (response) {
          return response;
        };
        
        var error = function (response) {
          if ($rootScope.waitToast != null) {
              $injector.invoke(['notif', function (notif) {
                  notif.clear($rootScope.waitToast);
              }]);
              
              $rootScope.waitToast = null;
          }  
          
          if (response.status == 500 || response.status == 401 || response.status == 403){
              $injector.invoke(['notif', function (notif) {
                  var msg = response.data.data;
                  
                  if (response.data.meta != null) {
                      msg += '<br /><a target="_blank" href="http://errbitrails.herokuapp.com/locate/' + response.data.meta + '">See error detail\'s</a>';
                  }
                  
                  notif.error(response.data.info, msg); 
              }]);
              
              if (response.status == 401) {
                  $location.path('/login');
              }
              
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
    
    var requestInterceptor = ['$q', '$location', '$injector', function ($q, $location, $injector) {
        var success = function (response) {
            return response;
        };
        
        var error = function (response) {
            return $q.reject(response);
        };
    }];

  $httpProvider.responseInterceptors.push(responseInterceptor);
}]);

angular.element(document).ready(function() {
    var req = $.ajax({ url: '/current_user' });
    
    var handler = function (resp) {
        var app = angular.bootstrap(document, ["starterApp"]);
        var session = app.get('Session');
        var root = app.get('$rootScope');
        var $location = app.get('$location');
        var notif = app.get('notif');
        var $timeout = app.get('$timeout');

        if (resp.data) {
          session.currentUser = resp.data;
        }
        else {
          session.currentUser = null;
        }
        
        var anonRoutes = ['/login', '/register', '/404', '/'];
        var userRoutes = ['/lock'];
        var adminRoutes = ['/user', '/payementTerm', '/entity'];
        var toast;
        
        root.$on('$routeChangeStart', function (event, next, current) {
            toast = notif.wait('Loading', 'Please wait while changing page');
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
        
        root.$on('$routeChangeSuccess', function (event, next, current) {
            if (toast != null) {
                notif.clear(toast);
            }
        });
        
        root.$on('$routeChangeError', function (event, next, current) {
            if (toast != null) {
                notif.clear(toast);
            }
        });
        
        root.$apply();
    };
    
    req.done(handler);
    req.fail(handler);
});

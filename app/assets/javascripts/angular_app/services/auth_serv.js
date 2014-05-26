angular.module("starterApp").factory('Session',['$location', '$http', '$q', 'notif', function($location, $http, $q, notif) {
    function redirect(url) {
        url = url || '/';
        $location.path(url);
    }
    
    var service = {
        login: function(user) {
            return $http.post('/login', {user: {email: user.email, password: user.password, rememberme: user.rememberme} })
                .then(function(resp) {
                    service.currentUser = resp.data.data;
                    if (service.isAuthenticated()) {
                        $location.path('/');
                    }
                }, function (resp) {
                    // error handling
                });
        },
        register: function (user) {
            return $http.post('/register', { user: { email: user.email, password: user.password, admin: user.admin }})  
                .then(function (resp) {
                    service.currentUser = resp.data.data;
                    if (service.isAuthenticated()) {
                        $location.path('/');
                    }
                }, function (resp) {
                   // error handling 
                });
        },
        logout: function(redirectTo) {
            $http.delete('/logout').then(function(resp) {
                service.currentUser = null;
                redirect(redirectTo);
            });
        },
        resetPassword: function (email) {
            var toast = notif.wait('Reseting password', 'Please wait while reseting your password');
            $http.post('user/resetPassword', {email: email}).then(function (resp) {
                 notif.clear(toast);
                 notif.log('Password reseted', 'Your new password has been sent through email.');
            }, function (resp) {
                notif.clear(toast);
            });
        },
        requestCurrentUser: function() {
            if (service.isAuthenticated()) {
                return $q.when(service.currentUser);
            } else {
                return $http.get('/current_user').then(function(resp) {
                    service.currentUser = resp.data.data;
                    return service.currentUser;
                });
            }
        },
        currentUser: null,
        isAuthenticated: function(){
            return !!service.currentUser;
        },
    };
    return service;
}]);
starterApp.factory('Session', function($location, $http, $q) {
    function redirect(url) {
        url = url || '/';
        $location.path(url);
    }
    
    var service = {
        login: function(user, password, rememberme) {
            return $http.post('/login', {user: {email: user.email, password: user.password, rememberme: user.rememberme} })
                .then(function(resp) {
                    service.currentUser = resp.data.data;
                    if (service.isAuthenticated()) {
                        $location.path('/');
                    }
                }, function (resp) {

                });
        },

        logout: function(redirectTo) {
            $http.delete('/logout').then(function(resp) {
                service.currentUser = null;
                redirect(redirectTo);
            });
        },

        register: function(email, password, confirm_password) {
            return $http.post('/users.json', {user: {email: email, password: password, password_confirmation: confirm_password} })
            .then(function(resp) {
                service.currentUser = resp.data;
                if (service.isAuthenticated()) {
                    $location.path('/record');
                }
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
        }
    };
    return service;
});
angular.module('common.services.notifications', ['toastr'])
	.factory('NotificationsService', ['toastr', function (toastr) {
	    
	    var options = {
	        allowHtml: true,
            closeButton: false,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            positionClass: 'toast-top-right',
            tapToDismiss: true,
            timeOut: 10000,
	    };
	    
	    var notifications = [];
	    
	    var notificationsService = {
	        info: info,
	        getNotifications: getNotifications,
	        clearAll: clearAll,
	        clear: clear
	    };
	    
	    return notificationsService;
	    
	    function add(message, title, type) {
	        notifications.push({ message: message, title: title, type: type });
			return toastr[type](message, title, options);
		};
		
	    function info (message, title) {
        return add(message, title, 'info');
        };
        
        function warning (message, title) {
            return add(message, title, 'warning');
        };
        
        function success (message, title) {
          return add(message, title, 'success');
        };
        
        function error (message, title) {
            return add(message, title, 'error');
        };
      
        function getNotifications (){
            return notifications.length > 0 ? notifications : [];
        };
        
    	function clearAll () {
			if (notifications.length > 0) { notifications.length = 0; }
		};
		
		function clear () {
			
		};
	    
	    
	}]);
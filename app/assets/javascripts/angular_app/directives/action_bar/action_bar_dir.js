angular.module("starterApp").directive('actionBar', ['$modal', function($modal) {
    return {
        restrict: "E",
        scope: false,
        templateUrl: 'angular_app/directives/action_bar/action_bar.html',
        link: function(scope, element, attrs) {
            scope.allowSave = (attrs.allowSave === 'true' || attrs.allowSave == null);
            scope.allowCancel = (attrs.allowCancel === 'true' || attrs.allowCancel == null);
            scope.allowApply = (attrs.allowApply === 'true' || attrs.allowApply == null);
            scope.allowDelete = (attrs.allowDelete === 'true' || attrs.allowDelete == null);
            
            scope.actionBar_doHandleDelete = function () {
                $modal.open({
                    templateUrl: 'angular_app/directives/action_bar/action_bar_confirm_delete.html',
                }).result.then(function () {
                    scope.delete();
                });
            }
        }
    }
}]);


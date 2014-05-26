angular.module("starterApp").directive('actionBar', [function() {
    return {
        restrict: "E",
        scope: false,
        templateUrl: 'angular_app/directives/action_bar/action_bar.html',
        link: function(scope, element, attrs) {
            scope.allowSave = (attrs.allowSave === 'true' || attrs.allowSave == null);
            scope.allowCancel = (attrs.allowCancel === 'true' || attrs.allowCancel == null);
            scope.allowApply = (attrs.allowApply === 'true' || attrs.allowApply == null);
        }
    }
}]);


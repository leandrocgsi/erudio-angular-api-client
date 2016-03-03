angular.module('$alerts').controller('AlertController',
['$scope', '$animate', 'AlertsManager',
 function($scope, $animate, AlertsManager) {
    $scope.alerts = AlertsManager.alerts;

    $scope.closeModalAlerts = function() {
        AlertsManager.modalAlertsInstance.dismiss();
    };
}]);

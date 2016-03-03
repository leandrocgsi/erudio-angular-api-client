angular.module('$alerts').directive( 'alerts', [ 'AlertsManager', function(AlertsManager){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/alerts/view/alerts-view.html',
        controller: 'AlertController'
    };
}]);
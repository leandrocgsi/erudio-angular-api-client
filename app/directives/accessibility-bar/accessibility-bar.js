angular.module('erudioApp').directive('accessibilityBar', [function(){
    return {
        restrict: 'AE',
        templateUrl: 'directives/accessibility-bar/accessibility-bar.html',        
        replace: true,
        controller: 'AccessibilityBarController',
        link: function(scope, element, attrs) {
        }
    }
}]);
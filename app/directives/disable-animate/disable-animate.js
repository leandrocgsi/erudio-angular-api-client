angular.module('erudioApp').directive("disableAnimate", [ '$animate',function ($animate) {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            $animate.enabled(elem, false);
        }
    };
}]);
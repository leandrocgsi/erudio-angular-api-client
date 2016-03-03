angular.module('erudioApp').directive('footer', [function(){
    return {
        restrict: 'AE',
        templateUrl: 'directives/footer/footer.html',
        replace: true,
        controller: 'FooterController'
    }
}]);
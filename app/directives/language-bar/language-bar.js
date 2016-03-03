angular.module('erudioApp').directive('languageBar',[ function(){
    return {
        restrict: 'AE',
        templateUrl: 'directives/language-bar/language-bar.html',
        replace: true,
        controller: 'LanguageBarController',
        link: function(scope, element, attrs){

        }

    }
}]);
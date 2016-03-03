angular.module('erudioApp').controller('LanguageBarController', ['$scope', 'I18nService', function($scope, I18nService){
    $scope.languages = I18nService.getLanguages();
    $scope.languageAtual = I18nService.languageSelected;    
    $scope.$watch(I18nService.languageAtual, function(newValue) {
        $scope.languageAtual = newValue;   
    });   
    $scope.mudarLanguage = I18nService.mudarLanguage;
}]);
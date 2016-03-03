angular.module('erudioApp').controller('AccessibilityBarController', ['$scope', 'AccessibilityService', 
    function($scope,AccessibilityService){
        $scope.toggleContraste = AccessibilityService.toggle;
        $scope.ajustarFonte = AccessibilityService.ajustarFonte;
        $scope.getFont = AccessibilityService.getFont;
        $scope.getFontSize = AccessibilityService.getFontSize;
        $scope.setFontSize = AccessibilityService.setFontSize;
    }
]);
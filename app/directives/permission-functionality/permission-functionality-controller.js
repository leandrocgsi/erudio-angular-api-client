angular.module('erudioApp').controller('PermissionFunctionalityController', ['$scope', 'FunctionalityService','NgTableParams','FunctionalityService',
    function($scope, FunctionalityService,NgTableParams){

        $scope.showFull = function(){
            $scope.isOpened = !$scope.isOpened;
        };

    }
]);

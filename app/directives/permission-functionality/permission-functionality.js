angular.module('erudioApp').directive('permissionFunctionality', [function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/permission-functionality/permission-functionality.html',
        replace: true,
        controller:'PermissionFunctionalityController',
        scope: {
            data: "=",
            readyonly: "=",
        },
        link: function(scope, element, attrs){
            scope.verificaChecked = function(){
                if(scope.readyonly === true){
                    return true;
                }
            }

            scope.checkAll = function(){
                for(var i in scope.data.tipoAcessoVOs){
                    if(scope.data.tipoAcessoVOs[i].checked){
                    scope.data.tipoAcessoVOs[i].checked = true;
                    }
                }
            }
        }
    }
}]);

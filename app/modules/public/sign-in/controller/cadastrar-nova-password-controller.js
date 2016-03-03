"use strict";
angular.module('erudioApp.signIn').controller('CadastrarNovaPasswordController',
['$scope', 'PublicService', 'MessageService', '$stateParams', '$state',
function($scope, PublicService, MessageService, $stateParams, $state){
    var self = this;
    self.formCadastrarNovaPassword = {};
    self.userExternal = {};

    self.init = function(){
        var codigo = $stateParams.codigo;
        PublicService.findUserExternalParaRedefinicaoPassword(codigo).then(function(resultado){
            self.userExternal = resultado;
        }, function(error) {
            $state.go("app.public.signIn.login");
        });
    };

    self.redefinirPassword = function() {
        var formValidation = $scope.validateForm(self.formCadastrarNovaPassword);
        var passwordValidation = $scope.validateFieldsIguais(self.formCadastrarNovaPassword['nova-password'], self.formCadastrarNovaPassword['confirmar-nova-password'], 'DIVERGENT_PASSWORDS');
        if (formValidation.isValid && passwordValidation.isValid) {
            PublicService.redefinicaoPassword(self.userExternal).then(function(resultado){
                MessageService.addSuccess("PASSWORD_RECOVERED_WITH_SUCESS").show();
                $state.go("app.public.signIn.login");
            });
        } else {
            MessageService.show();
        }
    };

    self.init();
}]);

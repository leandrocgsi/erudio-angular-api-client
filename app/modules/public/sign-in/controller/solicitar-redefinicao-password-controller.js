"use strict";
angular.module('erudioApp.signIn').controller('SolicitarRedefinicaoPasswordController',
['$scope', 'PublicService', 'MessageService','$state',
function($scope, PublicService, MessageService, $state){
    var self = this;
    self.formSolicitacaoRedefinicaoPassword = {};
    self.email = "";

    self.solicitarRedefinicao = function() {
        var formValidation = $scope.validateForm(self.formSolicitacaoRedefinicaoPassword);
        if (formValidation.isValid) {
            PublicService.solicitarRedefinicaoPassword(self.email).then(function(result){
                MessageService.addSuccess("EMAIL_SENT", {email:self.email}).show();
            });
        } else {
            formValidation.show();
        }

    };

    $scope.$on('Não é permitido o cadastro de nova password para servidores do ERUDIO.', function(event, data) {
        $state.go("app.public.signIn.login");
    });


}]);

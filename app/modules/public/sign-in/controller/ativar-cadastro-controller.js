"use strict";
angular.module('erudioApp.signIn').controller('AtivarCadastroController',
['$scope', 'PublicService', 'MessageService', '$stateParams',
function($scope, PublicService, MessageService, $stateParams){

    var self = this;
    self.message = "";

    self.init = function(){
        var codigo = $stateParams.codigo;
        PublicService.ativarCadastro(codigo).then(function(resultado){
            self.message = MessageService.getMessage(resultado.message);
        });
    };

    self.init();

}]);

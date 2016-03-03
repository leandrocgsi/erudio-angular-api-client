"use strict";
angular.module('erudioApp.service').service(
['$rootScope', 'Restangular', 'PublicService', '$state', '$localStorage', 'MessageService',
function($rootScope, Restangular, PublicService, $state, $localStorage, MessageService){

    var self = this;

    self.realizarLogin = function(u, password, callback) {
        Restangular
            .one('authc')
            .then(function(result){
                recuperarULogado();
                if (callback) {
                    callback();
                }
            }/*
            , function(error) {
                MessageService.addError("Usuário não cadastrado ou a password informada não confere.").show();*/
            );
            
    };

    self.realizarLogout = function(callback) {
    };

    function recuperarULogado(callback) {
            Restangular.one('authentication/uLogado').get().then(function(u){
                $localStorage.uLogado = u;
                $rootScope.$broadcast("USUARIO_LOGADO_EVENT", u);
                if (callback) {
                    callback(u);
                }
            });
    }

    self.getULogado = function(callback) {
        if ($localStorage.uLogado) {
            callback($localStorage.uLogado);
        } else {
            recuperarULogado(callback);
        }
    };

    self.isULogado = function(callback) {
        Restangular.one('authentication/uLogado').head();
    };

    self.isULogadoPossuiPermission = function(role){
        var permissoes = $localStorage.uLogado ? $localStorage.uLogado.permissoes : null;
        if(permissoes){
            for (var i = 0; i < permissoes.length; i++) {
                if (permissoes[i].startsWith(role)) {
                    return true;
                }
            }
        }
        return false;
    };

    self.getPermissoes = function() {
        //Restangular.one('authentication/todasPermissoes').get();
        return {
            MANTER_PAIS: {
                NOME: "MANTER_PAIS",
                CONSULTAR_PAIS: "MANTER_PAIS>CONSULTAR_PAIS",
                INCLUIR_PAIS: "MANTER_PAIS>INCLUIR_PAIS",
                ALTERAR_PAIS: "MANTER_PAIS>ALTERAR_PAIS",
                EXCLUIR_PAIS: "MANTER_PAIS>EXCLUIR_PAIS",
                VISUALIZAR_PAIS: "MANTER_PAIS>VISUALIZAR_PAIS",
            },
        };
    };

}]);

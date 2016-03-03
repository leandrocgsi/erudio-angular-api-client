"use strict";
angular.module('erudioApp.service').service('UserService',
[ 'Restangular', function(Restangular) {

    var self = this;
    var path = 'user/';
    var endPoint = Restangular.all(path);

    self.findrUserInternalVOTitularUnidade = function(idUnidade){
        return endPoint.one('findrUserInternalVOTitularUnidade', idUnidade).get();
    };

    self.recuperarUserLogado = function(){
        return endPoint.one('userLogado').get();
    };

    self.findrUserExternalEmail = function(email){
        return Restangular.one(path + 'findrUserExternalEmail', email).get();
    };

    self.cadastrarUserExternal = function(userExternal) {
        return Restangular.all(path + 'atualizarUserExternal/').post(userExternal);
    };

    self.findPaginadaUserInternal = function(paginacaoDTO){
        return Restangular.all(path + 'findPaginadaUserInternal').post(paginacaoDTO);
    };

    self.findPaginadaUserExternal = function(paginacaoDTO){
        return Restangular.all(path + 'findPaginadaUserExternal').post(paginacaoDTO);
    };
}]);

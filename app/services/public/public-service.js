"use strict";
angular.module('erudioApp.service').service('PublicService',
[ 'Restangular', 'MessageService', function(Restangular, MessageService) {

    var self = this;
    var path = 'public/';


    self.findAllPronomeTratamento = function() {
        return Restangular.all(path+'pronomeTratamento/').getList();
    };

    self.findAllPaisesAtivos = function() {
        return Restangular.all(path+'paisesAtivos/').getList();
    };

    self.findPaisPorName = function(name) {
        return Restangular.one(path+'pais/',name).get();
    };

    self.findAllUF = function() {
        return Restangular.all(path+'uf/').getList();
    };

    self.findAllGrauInstrucao = function() {
        return Restangular.all(path+'grauInstrucao/').getList();
    };

    self.cadastrarUserExternal = function(userExternal) {
        if (isUserExternalValidParaCadastro(userExternal)) {
            return Restangular.all(path+'cadastrarUserExternal/').post(userExternal);
        }
    };

    self.ativarCadastro = function(codigo) {
        if (codigo) {
            return Restangular.one(path+'ativarCadastro/', codigo).get();
        }
    };

    self.solicitarRedefinicaoPassword = function(email) {
        return Restangular.one(path+'solicitarRedefinicaoPassword/', email).get();
    };

    self.findUserExternalParaRedefinicaoPassword = function(codigo) {
        return Restangular.one(path+'findUserExternalParaRedefinicaoPassword/', codigo).get();
    };

    self.redefinicaoPassword = function(userExternal) {
        return Restangular.all(path+'redefinicaoPassword/').customPUT(userExternal);
    };

    function isUserExternalValidParaCadastro(userExternal) {
        var valid = true;
        if (isEmailGmail(userExternal.user.pessoa.email)) {
            MessageService.addError(MessageService.getMessage('EMAIL_NOT_ALLOWED'));
            valid = false;
        }
        if (!valid) {
            MessageService.show();
        }
        return valid;
    }

    function isEmailGmail(email) {
        return email.endsWith('@gmail.com');
    }

}]);
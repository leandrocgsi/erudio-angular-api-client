"use strict";
angular.module('erudioApp.service').service('TipoPessoaService',
[ 'Restangular', function(Restangular) {

    var self = this;

    self.PESSOA_FISICA = {
        id: 1,
        name: 'Pessoa Física'
    };

    self.PESSOA_JURIDICA = {
        id: 2,
        name: 'Pessoa Jurídica'
    };

    self.findAllTipoPessoa = function() {
        return [self.PESSOA_FISICA, self.PESSOA_JURIDICA];
    };

    self.findTipoPessoaId = function(id){
      var all = self.findAllTipoPessoa();
      for (var tipoPessoa of all) {
          if (tipoPessoa.id === id) {
              return tipoPessoa;
          }
      }
      return null;
    };

    self.isPessoaFisica = function(tipoPessoa) {
        return angular.equals(tipoPessoa, self.PESSOA_FISICA);
    };

    self.isPessoaJuridica = function(tipoPessoa) {
        return angular.equals(tipoPessoa, self.PESSOA_JURIDICA);
    };

}]);

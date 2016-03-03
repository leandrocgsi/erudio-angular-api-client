"use strict";
angular.module('erudioApp.signIn').controller('CadastrarUserController',
['$scope', 'PublicService', 'TipoPessoaService', 'MessageService', 'PaisService', '$state',
function($scope, PublicService, TipoPessoaService, MessageService, PaisService, $state){

    var self = this;

    self.formCadastroUser = {};

    self.pessoa = {};
    self.user = {};
    self.userExternal = {};
    self.passwordUserExternal = {};

    self.pronomeTratamentos = {};
    self.paisAtivos = {};
    self.ufs = {};
    self.grauInstrucoes = {};

    self.confirmarPassword = "";
    self.confirmarEmail = "";

    self.PESSOA_FISICA = TipoPessoaService.PESSOA_FISICA;
    self.PESSOA_JURIDICA = TipoPessoaService.PESSOA_JURIDICA;

    self.init = function() {
        self.pessoa = {
            tipoPessoa: self.PESSOA_FISICA
        };

        PublicService.findAllPaisesAtivos().then(function(paisesAtivos) {
            self.paisAtivos = paisesAtivos;
            self.pessoa.pais = PaisService.recuperarBrasil(paisesAtivos);
        });

        self.pronomeTratamentos = PublicService.findAllPronomeTratamento().$object;
        self.ufs = PublicService.findAllUF().$object;
        self.grauInstrucoes = PublicService.findAllGrauInstrucao().$object;
    };

    self.concluirCadastro = function() {
        var formValidation = $scope.validateForm(self.formCadastroUser);
        var passwordValidation = {};
        var emailValidation = {};
        passwordValidation = $scope.validateFieldsIguais(self.formCadastroUser['password'], self.formCadastroUser['confirmar-password'], 'DIVERGENT_PASSWORDS');
        emailValidation = $scope.validateFieldsIguais(self.formCadastroUser['email'], self.formCadastroUser['confirmar-email'], 'DIVERGENT_EMAIL');
        if (!formValidation.isValid || !passwordValidation.isValid || !emailValidation.isValid) {
            MessageService.show();
        } else {
            verificaUf(self.pessoa.pais);
            verificaPessoaJuridica(self.pessoa.tipoPessoa);
            self.user.pessoa = self.pessoa;
            self.userExternal.user = self.user;
            self.userExternal.passwordUserExternalVO = self.passwordUserExternal;
            PublicService.cadastrarUserExternal(self.userExternal).then(function() {
                MessageService.addSuccess("YOUR_REGISTRATION_WAS_SUCCESSFULL", {email: self.pessoa.email}).show();
                $state.go("app.public.signIn.login");
            });
        }
    };

    self.isPaisBrasil = function() {
        return PaisService.isPaisBrasil(self.pessoa.pais);
    };

    function verificaUf(pais){
        if(!PaisService.isPaisBrasil(pais)){
            self.pessoa.uf = null;
        }
    }

    function verificaPessoaJuridica(tipoPessoa){
        if(TipoPessoaService.isPessoaJuridica(tipoPessoa)) {
            self.pessoa.pronomeTratamento = null;
            self.pessoa.grauInstrucao = null;
        }
    }

    self.init();

}]);

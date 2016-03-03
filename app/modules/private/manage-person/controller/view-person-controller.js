"use strict";
angular.module('erudioApp.managePerson').controller('VisualizarPersonController',
['$scope', '$state', 'UserService', 'NgTableParams', '$uibModal', 'PersonService','FunctionalityService',
function($scope, $state, UserService, NgTableParams, $uibModal, PersonService, FunctionalityService){

    var self = this;
    self.person = $state.params.person;

    self.perfis =[];
    self.personSelected = {};
    self.personDetalhado = {};
    self.permissoesAtivas=[];

    self.tiposAcessoVOs = [];

    self.associarUserPersonDTO = {};

    self.paginacaoFunctionalitiesDTO =[];
    self.paginacaoUserInternalsDTO = {};
    self.paginacaoUserExternalsDTO = {};

    self.parametersTableUserInternals = {};
    self.parametersTableUserExternals = {};
    self.parametersTableFunctionalities = {};


    self.modalDataUser = function(person){
        self.modalDataUser(person);
    };

    self.limparParameters = function() {
        self.namePessoa = "";
        self.emailPessoa = "";
    };

    self.init = function() {

        if (!$state.params.person.id) {
            $state.go('app.private.managePerson.show');
        }

        initPerfis();
        initFunctionalities();
        self.paginacaoUserInternalsDTO = {
            filtros: {
                personAcesso: self.person,
                ativo: true
            }
        };
        initParametersTableUserInternals();

        self.paginacaoUserExternalsDTO = {
            filtros: {
                personAcesso: self.person,
                namePessoa: self.namePessoa,
                emailPessoa: self.emailPessoa,
                ativo: true
            }
        };
        initParametersTableUserExternals();

        /*self.paginacaoFunctionalitiesDTO = {
            filtros: {
                name: "",
                sigla: "",
                ativo: null
            },
            sortFields: "name",
            sortDirections: "asc"
        };*/
        initParametersTableFunctionalities();
    };

    self.pesquisarUserInternals = function() {
        initParametersTableUserInternals();
    };

    self.pesquisarUserExternals = function() {
        initParametersTableUserExternals();
    };


    self.limpar = function() {
        self.init();
    };

    function initParametersTableUserInternals() {
        self.parametersTableUserInternals = new NgTableParams(
            {
                page: 1,
                count: 5,
                sorting: {
                    "cuiw.userInternal.user.pessoa.name": "asc"
                }
            } , {
                getData: function ($defer, params) {
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    for (var field in sorting) {
                        self.paginacaoUserInternalsDTO.sortFields = field;
                        self.paginacaoUserInternalsDTO.sortDirections = sorting[field];
                    }
                    self.paginacaoUserInternalsDTO.pageSize = count;
                    self.paginacaoUserInternalsDTO.currentPage = page;
                    self.paginacaoUserInternalsDTO.list = null;
                    UserService.findPaginadaUserInternal(self.paginacaoUserInternalsDTO).then(function (result) {
                        self.parametersTableUserInternals.total(result.totalResults);
                        self.paginacaoUserInternalsDTO = result;
                        $defer.resolve(result.list);
                    });
                }
            }
        );
    }

    function initParametersTableUserExternals() {
        self.parametersTableUserExternals = new NgTableParams(
            {
                page: 1,
                count: 5,
                sorting: {
                    "user.pessoa.name": "asc"
                }
            } , {
                getData: function ($defer, params) {
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    for (var field in sorting) {
                        self.paginacaoUserExternalsDTO.sortFields = field;
                        self.paginacaoUserExternalsDTO.sortDirections = sorting[field];
                    }
                    self.paginacaoUserExternalsDTO.pageSize = count;
                    self.paginacaoUserExternalsDTO.currentPage = page;
                    self.paginacaoUserExternalsDTO.currentPage = page;
                    self.paginacaoUserExternalsDTO.filtros.namePessoa = self.namePessoa;
                    self.paginacaoUserExternalsDTO.filtros.emailPessoa = self.emailPessoa;
                    UserService.findPaginadaUserExternal(self.paginacaoUserExternalsDTO).then(function (result) {
                        self.parametersTableUserExternals.total(result.totalResults);
                        self.paginacaoUserExternalsDTO = result;
                        $defer.resolve(result.list);
                    });
                }
            }
        );
    }

    self.isPersonUserExternal = function(personAcesso) {
        PersonService.isPersonUserExternal(personAcesso);
    };

    self.modalDataUser = function(personAcesso) {
        var modalInstance = $uibModal.open({
            templateUrl: 'modules/private/manage-person/view/modal-data-user.html',
            controller: 'ModalDataUserController',
            controllerAs: 'modalDataUserCtrl',
            size: 'modal-md',
            backdrop : 'static',
            resolve: {
                'personAcesso': function(){
                    return personAcesso;
                },
                '$scope': function() {
                    return $scope;
                }

            }
        });
    };

   function initPerfis() {
        PersonService.findrAllPerfisInternals().then(function(retorno){
            self.perfis = retorno;
            self.personSelected = PersonService.findPersonAdministrador(retorno);
            self.pesquisaPersonComPermissoes();
        });
    }

    function tornarListaPlana(){
        var tiposAcesso = [];
        for(var i=0; i < self.paginacaoFunctionalitiesDTO.length; i++){
            var functionality = self.paginacaoFunctionalitiesDTO[i];
            for(var j=0; j <functionality.tipoAcessoVOs.length; j++){
                var tipoAcesso = functionality.tipoAcessoVOs[j];
                tipoAcesso.idFunctionality = functionality.id;
                tiposAcesso.push(tipoAcesso);
            }
        }
        self.tiposAcessoVOs = tiposAcesso;
    }

    function normalizarPermissoesSelecionadas(){
        for(var iTipoAcesso in self.tiposAcessoVOs){
            var tipoAcesso = self.tiposAcessoVOs[iTipoAcesso];
            tipoAcesso.checked = contemPermission(tipoAcesso.idFunctionality, tipoAcesso.id);
        }
    }

    function initFunctionalities(){
         FunctionalityService.findTodasFunctionalities().then(function (data){
                self.paginacaoFunctionalitiesDTO = data;
                self.totalRegisto = data.length;
                //initParametersTableFunctionalities();
                initParametersTableFunctionalities();
                tornarListaPlana();
            });
    }

    function getPermissoesSelecionadas(){
        var tiposAcessosAterados = []
        for(var iTipoAcesso in self.tiposAcessoVOs){
            var permissoes = self.tiposAcessoVOs[iTipoAcesso];
            if(permissoes.checked){
                tiposAcessosAterados.push(permissoes);
            }
        }
        return tiposAcessosAterados;
    }

    function contemPermission(idFunctionality, idTipoAcesso){
        var permission = null;
        for(var i=0; i<self.personDetalhado.permissoes.length; i++){
            permission = self.personDetalhado.permissoes[i];
            if(permission.id.idFunctionality === idFunctionality &&
                permission.id.idTipoAcesso === idTipoAcesso){
                return true;
            }
        }
        return false;
    }

    self.pesquisaPersonComPermissoes = function(){
        PersonService.findPersonDetelhar(self.personSelected.id).then(function(data){
            self.personDetalhado = data;
            normalizarPermissoesSelecionadas();
        });
    };

    function initParametersTableFunctionalities() {
        self.parametersTableFunctionalities = new NgTableParams(
            {
                page: 1,
                count: 15,
            } , {
                counts:[5,15,20,50,100],
                dataset: self.paginacaoFunctionalitiesDTO

            }
        );
    }

    self.init();
}]);

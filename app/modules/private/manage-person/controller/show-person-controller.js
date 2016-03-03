"use strict";
angular.module('erudioApp.managePerson')
    .controller('ShowPersonController', ['$scope', '$state', 'NgTableParams', 'MessageService', 'PersonService',
function($scope, $state, NgTableParams, MessageService, PersonService){
    var self = this;

    self.tableParams = {};
    self.paginationDTO;
    self.total = {};

    self.init = function() {
        self.paginationDTO = {
            filters: {
                name: ""
            },
            sortFields: "name",
            sortDirections: "asc"
        };
        self.initTableParams();
    };

    self.pesquisar = function() {
        self.initTableParams();
    };

    self.limpar = function() {
        self.init();
    };
    
    self.update = function(item) {
        $state.go('app.private.managePerson.update', {person: item});
    };

    self.initTableParams = function() {
        self.tableParams = new NgTableParams(
            {
                page: 1,
                count: 15,
                sorting: {
                    "name": "asc"
                }
            } , {
                counts:[5,15,20,50,100],
                getData: function ($defer, params) {
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();

                    for (var field in sorting) {
                        self.paginationDTO.sortFields = field;
                        self.paginationDTO.sortDirections = sorting[field];
                    }
                    self.paginationDTO.pageSize = count;
                    self.paginationDTO.currentPage = page;
                    self.paginationDTO.list = null;
                    PersonService.pagedSearch(self.paginationDTO).then(function (result) {
                        self.tableParams.total(result.totalResults);
                        self.total = result.totalResults;
                        self.paginationDTO = result;
                        $defer.resolve(result.list);
                    });
                }
            }
        );
    }

    self.init();

    self.disableChanges = function(item) {
       return PersonService.disableChanges(item);
    };

    self.onDelete = function(item) {
        MessageService.confirmDialog(MessageService.getMessage('Deseja realmente excluir este registro?'), function(response) {
            if (response) {
                PersonService.removePerson(item.idPerson).then(function(response){
                    MessageService.addSuccess(MessageService.getMessage('Registro excluído com sucesso!')).show()
                    self.initTableParams();
                });
            }
        });
    };
}]);

"use strict";
angular.module('erudioApp.managePerson.service').service('PersonService',
['Restangular',
function(Restangular){
    var self = this;
    var path = 'v1/person';

    self.findAllPerfis = function(){
        return Restangular.all(path).getList();
    };

    self.findAllPerfisInternals = function() {
        return Restangular.all(path+'/findAll').getList();
    };

    self.pagedSearch = function(paginationDTO){
        return Restangular.all(path + '/pagedSearch').post(paginationDTO);
    };

    self.findPersonPorId = function(id){
        return Restangular.one(path + '/',id).getList();
    };

    self.insertPerson = function(person){
        return Restangular.all(path).post(person);
    };

    self.updatePerson = function(person){
        return Restangular.all(path).customPUT(person);
    };

    self.removePerson = function(id){
        return Restangular.one(path,id).remove();
    };

    self.findAssociarPersonUser = function(associarUserPersonDTO){
        return Restangular.all(path + 'findAssociarPersonUser/').post(associarUserPersonDTO);
    };

    self.findPersonDetelhar = function(id){
        return Restangular.one(path + 'detalhar/'+id).get();
    }

    self.gravarPerilComPermissoes = function(personComPermissoes){
        return Restangular.all(path+'/permissoes').customPUT(personComPermissoes);
    }

    self.findPersonAdministrador = function(perfis) {
        if (perfis) {
            for (var i = 0; i < perfis.length; i++) {
                if (self.isPersonAdministrador(perfis[i])) {
                    return perfis[i];
                }
            }
        }
    };

    self.disableChanges = function(item) {
        if(self.isPersonAdministrador(item) ||  self.isPersonUserExternal(item) || self.isPersonUserInternal(item)){
            return true;
        }
    };

    self.isPersonAdministrador = function(person) {
        return person.name == 'ADMINISTRATOR';
    };

    self.isPersonUserExternal = function(person) {
        return person.name == 'USUARIO_EXTERNAL';
    };

    self.isPersonUserInternal = function(person) {
        return person.name == 'USUARIO_INTERNAL';
    };
}]);

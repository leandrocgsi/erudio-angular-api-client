"use strict";
angular.module('erudioApp.managePerson').controller('ModalDadosUserController',
['$scope','MessageService','UserService','personAcesso','$uibModalInstance',
function($scope,MessageService,UserService,personAcesso,$uibModalInstance){

    var self = this;
    self.formModalDadosUser = {};
    self.userInternal = {};

    self.init = function(){
        self.personAcesso = angular.copy(personAcesso);
    };

    self.getMessage = function(message) {
        return $scope.getMessage(message);
    };

    self.fecharModal = function() {
         $uibModalInstance.close();
    };

    self.init();
}]);

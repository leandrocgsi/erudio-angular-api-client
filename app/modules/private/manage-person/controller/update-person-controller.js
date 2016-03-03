angular.module('erudioApp.managePerson')
    .controller('UpdatePersonController', ['$scope', '$state', 'PersonService', 'GenderService', 'MessageService',
function($scope, $state, PersonService, GenderService, MessageService){
    var self = this;
    self.titulo = MessageService.getMessage('UPDATE_PERSON');
    
    self.genders = GenderService.findAllGenders();
    
    self.person = $state.params.person;
    
    self.selectedItem =  angular.copy(self.person.gender.idGender);
    
    self.cadastrarPerson = function() {
        var formValidation = $scope.validateForm(self.formPerson);
        if(formValidation.isValid){
            self.person.gender.idGender = self.selectedItem;
            self.person.name = angular.copy(self.person.permission.replace(/ /g, '_'));
            PersonService.updatePerson(self.person).then(function(resultado){
                MessageService.addSuccess('Registro alterado com sucesso!').show();
                $state.go('app.private.managePerson.show');
            });  
        } else {
            formValidation.show();
        }
    };
    
    self.redirect = function(state){
        $state.go(state);
    }
}]);

angular.module('erudioApp.managePerson')
    .controller('InsertPersonController', ['$scope', '$state', 'PersonService','GenderService','MessageService',
function($scope, $state, PersonService, GenderService, MessageService){
    var self = this;
    self.titulo = MessageService.getMessage('INSERT_PERSON');
    
    self.genders = GenderService.findAllGenders();
    
    self.person = $state.params.person;

    self.person.addresses = [
    {
      "idAddress": 2,
      "neighborhood": "PRESIDENTE ROOSEVELT",
      "streetName": "VENONGERO CABRAL DE MELO",
      "postalCode": "38401230",
      "number": 36,
      "complement": "AP 301",
      "publicAreaType": {
        "idPublicAreaType": 1,
        "publicAreaTypeDescription": "RUA"
      },
      "state": {
        "idState": 1,
        "stateName": "MINAS GERAIS"
      },
      "addressType": {
        "idAddressType": 1,
        "description": "RESIDENCIAL"
      },
      "city": {
        "idCity": 1,
        "name": "UBERLANDIA",
        "links": []
      }
    }
  ]
    
    self.cadastrarPerson = function() {
        var formValidation = $scope.validateForm(self.formPerson);
        if(formValidation.isValid){
            self.person.insertDate = "1992-02-03";
            PersonService.insertPerson(self.person).then(function(resultado){
                MessageService.addSuccess('Registro incluído com sucesso!').show();
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
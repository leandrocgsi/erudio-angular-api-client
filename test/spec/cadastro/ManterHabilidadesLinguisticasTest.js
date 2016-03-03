'use strict';

describe('ManterHabilidadesLinguisticas', function(){

    var $controller;

    var controller;


    beforeEach(function(){
        module('erudioApp.cadastro');
    });

    

    describe('Escopo', function(){
        var $scope = {};

        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;        

            controller = $controller('InstrucaoController', {$scope: $scope});
        }));


        it('Existência dos métodos teste do controllador', function(){
            expect($scope.verificaMaior(4,3)).toBeTruthy();

            expect(controller.verificaMenor(3,4)).toBeTruthy();
        });
    })
   
});
angular.module('erudioApp').directive('counterCaracters', function(){

	var diretiva = {};
	diretiva.restrict = 'E';
	diretiva.templateUrl = 'directives/counter/counter-caracters-view.html';
    diretiva.controller = 'CounterController';
    diretiva.controllerAs = 'CounterCtrl';
    diretiva.scope = {
    	value : '=value',
    	max : '@max'
    };

    return diretiva;

});



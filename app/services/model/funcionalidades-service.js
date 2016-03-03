"use strict";
angular.module('erudioApp.service').service('FunctionalityService',
[ 'Restangular', function(Restangular) {

    var self = this;
    var path = 'perfil';
    var endPoint = Restangular.all(path);

    self.findPermissoesPorId = function(idFunctionality){
        return endPoint.one('/permission/'+ idFunctionality).getList();
    }

    self.findTodasFunctionalities = function(){
        return endPoint.all( '/functionality').getList();
    }

}]);

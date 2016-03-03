"use strict";
angular.module('erudioApp.service').service('PaisService',
[ 'Restangular', function(Restangular) {

    var self = this;
    var path = 'pais/';

    self.findAllPaisesAtivos = function() {
        return Restangular.all(path).getList();
    };

    self.findPaisPorName = function(name) {
        return Restangular.one(name).get();
    };

    self.recuperarBrasil = function(paises) {
        for (var pais of paises) {
            if (self.isPaisBrasil(pais)) {
                return pais;
            }
        }
    };

    self.isPaisBrasil = function(pais) {
        if (pais) {
            return 'BRASIL' === pais.name.toUpperCase();
        }
    };

}]);

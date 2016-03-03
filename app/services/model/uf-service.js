"use strict";
angular.module('erudioApp.service').service('UFService',
[function(){
    var self = this;
    self.findAllUFs = function() {
        return [
            {"idState": 1, "stateName": "MINAS GERAIS"},
            {"idState": 2, "stateName": "ACRE"},
            {"idState": 3, "stateName": "ALAGOAS"},
            {"idState": 4, "stateName": "AMAZONAS"},
            {"idState": 5, "stateName": "AMAPÁ"},
            {"idState": 6, "stateName": "BAHIA"},
            {"idState": 7, "stateName": "CEARÁ"},
            {"idState": 8, "stateName": "DISTRITO FEDERAL"},
            {"idState": 9, "stateName": "ESPÍRITO SANTO"},
            {"idState": 10, "stateName": "GOIÁS"},
            {"idState": 11, "stateName": "MARANHÃO"},
            {"idState": 12, "stateName": "MATO GROSSO DO SUL"},
            {"idState": 13, "stateName": "MATO GROSSO"},
            {"idState": 14, "stateName": "PARÁ"},
            {"idState": 15, "stateName": "PARAÍBA"},
            {"idState": 16, "stateName": "PERNAMBUCO"},
            {"idState": 17, "stateName": "PIAUÍ"},
            {"idState": 18, "stateName": "PARANÁ"},
            {"idState": 19, "stateName": "RIO DE JANEIRO"},
            {"idState": 20, "stateName": "RIO GRANDE DO NORTE"},
            {"idState": 21, "stateName": "RORAIMA"},
            {"idState": 22, "stateName": "RONDÔNIA"},
            {"idState": 23, "stateName": "RIO GRANDE DO SUL"},
            {"idState": 24, "stateName": "SANTA CATARINA"},
            {"idState": 25, "stateName": "SERGIPE"},
            {"idState": 26, "stateName": "SÃO PAULO"},
            {"idState": 27, "stateName": "TOCANTINS"}
        ]
    };
}]);

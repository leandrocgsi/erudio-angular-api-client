'use strict';

angular.module('erudioApp').service('RolesAllowedService', ['$localStorage', function($localStorage){
    var self = this;

    self.verificarSeUserLogadoPossuiPermission = function(role){
        var permissoes = $localStorage.userLogado ? $localStorage.userLogado.permissoes : null;
        if(permissoes){
            for (var permission of permissoes) {
                if (permission.startsWith(role)) {
                    return true;
                }
            }
        }
        return false;
    };
}]);

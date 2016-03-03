"use strict";
angular.module('erudioApp.service').service('MessageService',
[ '$rootScope', '$http', '$q', 'AlertsManager', '$filter', 'DialogManagerService',
function ($rootScope, $http, $q, AlertsManager, $filter, DialogManagerService) {

    var self = this;
    self.msgError = [];
    self.msgWarning = [];
    self.msgSuccess = [];
    self.msgInfo = [];

    $rootScope.$on('responseErrorEvent', function(event, data) {
        $rootScope.$broadcast(data.msg);
        data.msg = self.getMessage(data.msg);
        AlertsManager.add(data);
    });

    self.addError = function(message, params){
        self.msgError = self.msgError.concat(self.getMessage(message, params));
        return self;
    };
    self.addWarning = function(message, params){
        self.msgWarning = self.msgWarning.concat(self.getMessage(message, params));
        return self;
    };
    self.addSuccess = function(message, params){
        self.msgSuccess = self.msgSuccess.concat(self.getMessage(message, params));
        return self;
    };

    self.addInfo = function(message, params){
        self.msgInfo = self.msgInfo.concat(self.getMessage(message, params));
        return self;
    };

    self.show = function() {
        if (self.msgError.length > 0) {
            AlertsManager.addError(self.msgError.join('<br/>'));
        }
        if (self.msgWarning.length > 0) {
            AlertsManager.addWarning(self.msgWarning.join('<br/>'));
        }
        if (self.msgSuccess.length > 0) {
            AlertsManager.addSuccess(self.msgSuccess.join('<br/>'));
        }
        if (self.msgInfo.length > 0) {
            AlertsManager.addInfo(self.msgInfo.join('<br/>'));
        }
        self.limpar();
        return self;
    };

    self.limpar = function() {
        self.msgError = [];
        self.msgWarning = [];
        self.msgSuccess = [];
        self.msgInfo = [];
        return self;
    };

    self.getMessage = function(label, obj){
        if (label.constructor === Array) {
            return label;
        }
        var message = $filter('translate')(label, obj);
        if(message){
            return message;
        } else {
            return label;
        }
    };

    self.confirmDialog = function(message, callBack) {
        DialogManagerService.modalDialog(self.getMessage(message), callBack);
    };

}]);

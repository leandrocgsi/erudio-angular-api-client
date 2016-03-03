angular.module('$alerts').service('AlertsManager', function($rootScope, $timeout, $animate, $uibModal) {
    self = this;

    self.alerts = {};
    self.alertsCounter = 0;
    self.timeout = 0;
    self.isShowing = false;
    self.modalAlertsInstance = {};

    if( !self.alerts ){
        self.alerts = {};
    };

    self.modalAlerts = function() {
        self.modalAlertsInstance = $uibModal.open({
            template: '<alerts></alerts>',
            controller: 'AlertController',
            size: 'md'
        });
        self.modalAlertsInstance.result.then(function (retorno) {
        }, function (retorno) {
            self.clear();
        });
    };

    self.closeById = function(id){
        if( self.alerts[id] ){
            delete self.alerts[id];
        }
    };

    self.closeAlert = function(id, response){
        self.isShowing = false;
        self.closeById(id);
        self.checkForAlerts();
    };

    self.add = function(obj) {
        if (self.alertsCounter == 0) {
            self.modalAlerts();
        }
        obj.id = self.alertsCounter++;
        obj.timeout = obj.timeout || self.timeout;
        self.alerts[obj.id] = obj;
    };

    self.addError = function(message){
        self.add( { type: 'danger', msg: message } );
    };

    self.addWarning = function(message){
        self.add( { type: 'warning', msg: message } );
    };

    self.addSuccess = function(message){
        self.add( { type: 'success', msg: message } );
    };

    self.addInfo = function(message){
        self.add( { type: 'info', msg: message } );
    };

    self.clear = function() {
        for(var x in self.alerts) {
            delete self.alerts[x];
        }
        self.alertsCounter = 0;
    };

    self.get = function() {
        return self.alerts;
    };

});

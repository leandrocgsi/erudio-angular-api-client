angular.module('erudioApp.dialog').controller('DialogController',
['$scope', 'DialogManagerService', 'message',
 function($scope, DialogManagerService, message) {
    var self = this;

    self.message = message;

    self.returnTrue = function() {
        DialogManagerService.modalInstance.close(true);
    };

    self.returnFalse = function() {
        DialogManagerService.modalInstance.close(false);
    };



}]);

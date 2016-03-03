angular.module('erudioApp.dialog').service('DialogManagerService', ['$rootScope', '$uibModal', '$document', function($rootScope, $uibModal, $document) {
    var self = this;

    self.modalInstance = {};

    self.modalDialog = function(message, callBack) {
        self.modalInstance = $uibModal.open({
            templateUrl: 'modules/dialog/view/dialog-view.html',
            controller: 'DialogController',
            controllerAs: 'dialogCtrl',
            size: 'md',
            backdrop : 'static',
            resolve: {
                'message': function(){
                    return message;
                }
            }
        });
        return self.modalInstance.result.then(callBack, callBack);
    };

}]);
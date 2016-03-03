'use strict';
angular.module('erudioApp.signIn')
.controller('LoginController',['$rootScope', '$scope', '$stateParams', '$state', '$location',
function($rootScope, $scope, $stateParams, $state, $location){
    var self = this;
    self.formLogin = {};
    self.user = "";
    self.password = "";

    self.performLogin = function(){
        var formValidation = $scope.validateForm(self.formLogin);
        if (formValidation.isValid) {
            $state.go('app.private.index');
        } else {
            formValidation.show();
        }
    };

    console.log($scope);
}]);

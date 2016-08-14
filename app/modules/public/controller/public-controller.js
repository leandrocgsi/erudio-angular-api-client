"use strict";
angular.module('erudioApp').controller('PublicController',
[ '$scope', '$state',
 function($scope, $state){
    var self = this;

    function init() {
      //  if ($scope.userLogado) {
            $state.go('app.private.index');
        //}
    }

    init();
}]);

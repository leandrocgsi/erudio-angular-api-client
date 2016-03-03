"use strict";
angular.module('erudioApp.service').service('GenderService',
[function(){
    var self = this;
    self.findAllGenders = function() {
        return [
            {"idGender": 1, "description": "MALE"},
            {"idGender": 2, "description": "FEMALE"}
        ]
    };
}]);

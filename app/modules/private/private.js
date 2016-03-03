"use strict";
angular.module('erudioApp').config(['$stateProvider', function($stateProvider) {
    $stateProvider

    .state( 'app.private', {
        url: '/private',
        abstract: true,
        controller: 'PrivateController',
        controllerAs:"privateCtrl",
        templateUrl: 'modules/private/template-private.html',
        resolve:  {
            root: [ '$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name: 'erudioApp',
                    files: [
                        'modules/private/controller/private-controller.js'
                    ]
                });
            }]
        }
    });
}]);

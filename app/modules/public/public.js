"use strict";
angular.module('erudioApp').config(['$stateProvider', function($stateProvider) {

    $stateProvider.state( 'app.public', {
        url: '/public',
        abstract: true,
        controller: 'PublicController',
        controllerAs:"publicCtrl",
        templateUrl: 'modules/public/template-public.html',
        resolve:  {
            root: [ '$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name: 'erudioApp',
                    files: [
                        'modules/public/controller/public-controller.js'
                    ]
                });
            }]
        }
    });
}]);

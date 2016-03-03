"use strict";
angular.module('erudioApp.index.service',[]);
angular.module('erudioApp.index', ['erudioApp.index.service']).config(['$stateProvider', function($stateProvider) {

    $stateProvider

    .state('app.private.index', {
        url: '/index',
        abstract: false,
        templateUrl: 'modules/private/index/view/index.html',
        controller: 'IndexMainController',
        controllerAs: 'indexCtrl',
        resolve: {
            index: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.index',
                    files: [
                        'modules/private/index/controller/index-main-controller.js'
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            skip: true
        }
    });
}]);

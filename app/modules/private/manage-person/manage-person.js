"use strict";
angular.module('erudioApp.service',[]);
angular.module('erudioApp.managePerson.service',[]);
angular.module('erudioApp.managePerson', ['erudioApp.managePerson.service', 'erudioApp.service']).config(['$stateProvider', function($stateProvider) {

    $stateProvider

    .state('app.private.managePerson', {
        url: '/managePerson',
        abstract: true,
        template: '<ui-view/>',
        controller: 'ManagePersonMainController',
        controllerAs: 'managePersonCtrl',
        resolve: {
            managePerson: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson',
                    files: [
                        'modules/private/manage-person/controller/manage-person-main-controller.js'
                    ]
                });
            }]
        }
    })
    .state('app.private.managePerson.show', {
        url: '/show',
        templateUrl: 'modules/private/manage-person/view/show-person.html',
        controller: 'ShowPersonController',
        controllerAs: 'showPersonCtrl',
        resolve: {
            showPerson: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson',
                    files: [
                        'modules/private/manage-person/controller/show-person-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson.service',
                    files: [
                        'services/model/person-service.js'
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            label: 'Início / Configurações / Gerenciar Person'
        }
    })
    .state('app.private.managePerson.insert', {
        url: '/insert',
        templateUrl: 'modules/private/manage-person/view/maintain-person.html',
        controller: 'InsertPersonController',
        controllerAs: 'maintainPersonCtrl',
        resolve: {
            insertPerson: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson',
                    files: [
                        'modules/private/manage-person/controller/insert-person-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson.service',
                    files: [
                        'services/model/person-service.js',
                        'services/model/gender-service.js'
                    ]
                });
            }]
        },
        params:{
            person: {}
        },
        ncyBreadcrumb: {
            label: 'Início / Configurações / Manage Person / Insert Person'
        }
    })
    .state('app.private.managePerson.update', {
        url: '/update',
        templateUrl: 'modules/private/manage-person/view/maintain-person.html',
        controller: 'UpdatePersonController',
        controllerAs: 'maintainPersonCtrl',
        resolve: {
            insertPerson: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson',
                    files: [
                        'modules/private/manage-person/controller/update-person-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson.service',
                    files: [
                        'services/model/person-service.js',
                        'services/model/gender-service.js'
                    ]
                });
            }]
        },
        params:{
            person: {}
        },
        ncyBreadcrumb: {
            label: 'Início / Configurações / Gerenciar Person / Update Person'
        }
    })
    .state('app.private.managePerson.visualizar', {
        url: '/visualizar',
        templateUrl: 'modules/private/manage-person/view/view-person.html',
        controller: 'VisualizarPersonController',
        controllerAs: 'visualizarPersonCtrl',
        resolve: {
            visualizarPerson: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson',
                    files: [
                        'modules/private/manage-person/controller/view-person-controller.js',
                        'modules/private/manage-person/controller/modal-data-user-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.managePerson.service',
                    files: [
                        'services/model/person-service.js',
                        'services/model/functionalities-service.js',
                        'services/model/user-service.js'
                    ]
                });
            }]
        },
        params:{
            person: {}
        },
        ncyBreadcrumb: {
            label: 'Início / Configurações / Gerenciar Person / Visualizar Person'
        }
    });
}]);

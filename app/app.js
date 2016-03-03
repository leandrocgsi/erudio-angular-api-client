"use strict";
angular.module('erudioApp.service',[]);
angular.module('erudioApp', [
    'oc.lazyLoad',
    'ncy-angular-breadcrumb',
    'ui.router',
    '$config',
    '$alerts',
    'ui.utils.masks',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'hljs',
    'ngTable',
    'ui.tree',
    'ngMask',
    'restangular',
    'flow',
    'pascalprecht.translate',
    'ui.tinymce',
    'erudioApp.dialog',
    'erudioApp.service',
    'erudioApp.signIn',
    'erudioApp.managePerson',
    'erudioApp.index'

])
.config(['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider', '$animateProvider', 'RestangularProvider', 'CONFIG_APP', '$translateProvider',
function($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $animateProvider, RestangularProvider, CONFIG_APP, $translateProvider){

    $ocLazyLoadProvider.config({
        debug: true,
        events: true
    });

    $urlRouterProvider.otherwise('/public/login');

    $stateProvider.state('app', {
        url: '',
        abstract: true,
        templateUrl: 'main.html',
        controller: 'AppController',
        controllerAs:'appCtrl',
        resolve: {
            root: [ '$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name: 'erudioApp',
                    files: [
                        'controller/app-controller.js',
                        'directives/accessibility-bar/accessibility-bar-controller.js',
                        'directives/accessibility-bar/accessibility-bar.js',
                        'directives/language-bar/language-bar.js',
                        'directives/language-bar/language-bar-controller.js',
                        'directives/custom-validator/custom-validator.js',
                        'directives/capitalize/capitalize.js',
                        'directives/permission-functionality/permission-functionality.js',
                        'directives/permission-functionality/permission-functionality-controller.js',
                        'filters/cpf/cpf.js',
                        'filters/cnpj/cnpj.js'
                    ]
                });
            }],
            alerts: [ '$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name: '$alerts',
                    files: [
                        'modules/alerts/controller/alerts-controller.js',
                        'modules/alerts/directive/alerts-directive.js',
                        'modules/alerts/service/alerts-manager.js'
                    ]
                });
            }],
            dialog: [ '$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name: 'erudioApp.dialog',
                    files: [
                        'modules/dialog/controller/dialog-controller.js',
                        'modules/dialog/service/dialog-manager-service.js'
                    ]
                });
            }],
            services: [ '$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load({
                    name: 'erudioApp.service',
                    files: [
                        'services/i18n/i18n-service.js',
                        'services/accessibility/accessibility-service.js',
                        'services/message/message-service.js',
                        'services/public/public-service.js',
                        'services/authentication/authentication-service.js'
                    ]
                });
            }],
            tranlate:['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('services/message/language');
                return $translate.refresh();
            }]
        }
    });

    RestangularProvider.setBaseUrl(CONFIG_APP.apiEndpoint);

    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

}]);

"use strict";
angular.module('erudioApp.signIn.service',[]);
angular.module('erudioApp.signIn', ['erudioApp.signIn.service']).config(['$stateProvider', function($stateProvider) {

    $stateProvider

    .state('app.public.signIn', {
        url: '',
        abstract: true,
        template: '<ui-view/>',
        controller: 'SignInMainController',
        controllerAs: 'signInMainCtrl',
        resolve: {
            signIn: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.signIn',
                    files: [
                        'modules/public/sign-in/controller/sign-in-main-controller.js'
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            skip:true
        }
    })

    .state('app.public.signIn.login', {
        url: '/login?redirectUrl',
        templateUrl: 'modules/public/sign-in/view/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl',
        resolve: {
            sample: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.signIn',
                    files: [
                        'modules/public/sign-in/controller/login-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.signIn.service',
                    files: [
                        'modules/public/sign-in/service/sign-in-service.js'
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            skip:true
        }
    })

    .state('app.public.signIn.solicitarRedefinicaoPassword', {
        url: '/solicitarRedefinicaoPassword',
        templateUrl: 'modules/public/sign-in/view/solicitar-redefinicao-password.html',
        controller: 'SolicitarRedefinicaoPasswordController',
        controllerAs: 'solicitarRedefinicaoPasswordCtrl',
        resolve: {
            sample: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.signIn',
                    files: [
                        'modules/public/sign-in/controller/solicitar-redefinicao-password-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.service',
                    files: [
                        "services/public/public-service.js"
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            skip:true
        }
    })

    .state('app.public.signIn.cadastrarNovaPassword', {
        url: '/cadastrarNovaPassword?codigo',
        templateUrl: 'modules/public/sign-in/view/cadastrar-nova-password.html',
        controller: 'CadastrarNovaPasswordController',
        controllerAs: 'cadastrarNovaPasswordCtrl',
        resolve: {
            sample: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.signIn',
                    files: [
                        'modules/public/sign-in/controller/cadastrar-nova-password-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.service',
                    files: [
                        'services/public/public-service.js'
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            skip:true
        }
    })

    .state('app.public.signIn.cadastrarUser', {
        url: '/cadastrarUser',
        templateUrl: 'modules/public/sign-in/view/cadastrar-user.html',
        controller: 'CadastrarUserController',
        controllerAs: 'cadastrarUserCtrl',
        resolve: {
            sample: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.signIn',
                    files: [
                        'modules/public/sign-in/controller/cadastrar-user-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.service',
                    files: [
                        'services/public/public-service.js',
                        'services/model/tipo-pessoa-service.js',
                        'services/model/pais-service.js'
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            skip:true
        }
    })

    .state('app.public.signIn.ativarCadastro', {
        url: '/ativarCadastro?codigo',
        templateUrl: 'modules/public/sign-in/view/ativar-cadastro.html',
        controller: 'AtivarCadastroController',
        controllerAs: 'ativarCadastroCtrl',
        resolve: {
            sample: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.signIn',
                    files: [
                        'modules/public/sign-in/controller/ativar-cadastro-controller.js'
                    ]
                });
            }],
            service: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'erudioApp.service',
                    files: [
                        'services/public/public-service.js'
                    ]
                });
            }]
        },
        ncyBreadcrumb: {
            skip:true
        }
    });

}]);

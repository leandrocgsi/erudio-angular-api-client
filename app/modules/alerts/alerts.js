angular.module('$alerts', ['oc.lazyLoad', 'pascalprecht.translate']).config( ['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('httpMessageHandleInterceptor');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With']
}]).run( [ '$ocLazyLoad', function( $ocLazyLoad ){
    $ocLazyLoad.load({
        name: '$alerts',
        files: [
            'modules/alerts/service/alerts-manager.js',
            'modules/alerts/controller/alerts-controller.js'
        ]
    });
}]);
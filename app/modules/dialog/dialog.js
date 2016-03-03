angular.module('erudioApp.dialog', ['oc.lazyLoad'])
.run(['$ocLazyLoad', function($ocLazyLoad){
    $ocLazyLoad.load({
        name: 'erudioApp.dialog',
        files: [
            'modules/dialog/service/dialog-manager-service.js',
            'modules/dialog/controller/dialog-controller.js'
        ]
    });
}]);

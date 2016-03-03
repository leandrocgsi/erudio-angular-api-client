angular.module('erudioApp.signIn').controller('SignInMainController',
['$translate', '$translatePartialLoader',
function($translate, $translatePartialLoader){
    var self = this;
    $translatePartialLoader.addPart('modules/public/sign-in/language');
    $translate.refresh();
}]);

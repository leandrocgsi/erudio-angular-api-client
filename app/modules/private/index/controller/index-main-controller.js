angular.module('erudioApp.index').controller('IndexMainController',
['$translate', '$translatePartialLoader',
function($translate, $translatePartialLoader){
    var self = this;
    $translatePartialLoader.addPart('modules/private/index/language');
    $translate.refresh();
}]);

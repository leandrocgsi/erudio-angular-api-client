angular.module('erudioApp.managePerson').controller('ManagePersonMainController',
['$translate', '$translatePartialLoader', '$scope',
function($translate, $translatePartialLoader, $scope){
    var self = this;
    $translatePartialLoader.addPart('modules/private/manage-person/language');
    $translate.refresh();
}]);

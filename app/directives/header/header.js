'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
 angular.module('erudioApp').directive('header',function(){
  return {
    templateUrl : 'directives/header/header.html',
    restrict: 'E',
    replace: true,
    controller: 'HeaderController'
  }
});



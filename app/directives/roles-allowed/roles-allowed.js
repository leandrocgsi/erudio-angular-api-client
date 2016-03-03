'use strict';

angular.module('erudioApp').directive('rolesAllowed',['$animate', 'RolesAllowedService', '$parse', function($animate, RolesAllowedService, $parse){
  return {
    multiElement: true,
    transclude: 'element',
    priority: 600,
    terminal: true,
    restrict: 'A',
    $$tlb: true,
    link: function($scope, $element, $attr, ctrl, $transclude) {
      var block, childScope, previousElements;
      var role = $attr.rolesAllowed;
      $scope.$watch(role, function rolesAllowedWatchAction() {

        var possuiPermission = RolesAllowedService.verificarSeUserLogadoPossuiPermission(role);

        if (possuiPermission) {
          if (!childScope) {
            $transclude(function(clone, newScope) {
              childScope = newScope;
              clone[clone.length++] = document.createComment(' end rolesAllowed: ' + role + ' ');
              // Note: We only need the first/last node of the cloned nodes.
              // However, we need to keep the reference to the jqlite wrapper as it might be changed later
              // by a directive with templateUrl when its template arrives.
              block = {
                clone: clone
              };
              $animate.enter(clone, $element.parent(), $element);
            });
          }
        } else {
          if (previousElements) {
            previousElements.remove();
            previousElements = null;
          }
          if (childScope) {
            childScope.$destroy();
            childScope = null;
          }
          if (block) {
            previousElements = getBlockNodes(block.clone);
            $animate.leave(previousElements).then(function() {
              previousElements = null;
            });
            block = null;
          }
        }
      });
    }
  };
}]);

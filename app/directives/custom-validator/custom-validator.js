angular.module('erudioApp').directive('customValidator', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.customValidator = function(modelValue, viewValue) {
                return true;
            };
        }
    };
});

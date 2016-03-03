angular.module('erudioApp').filter('separatedValue', function () {
  return function (input, separator) {
    return input.join(separator);
  };
});

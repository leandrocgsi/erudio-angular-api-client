angular.module('erudioApp').controller('CounterController', ['$scope', function($scope){


	var self = this;

	self.numerosRestantes = function(){
		if($scope.value){
			return  $scope.maximo - $scope.value.length;
		}

	};
	
}]);
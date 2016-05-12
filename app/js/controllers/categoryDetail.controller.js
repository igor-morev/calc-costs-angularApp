angular
	.module('costs')
	.filter('sumByKey', function() {
	    return function(data, key) {
	        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
	            return 0;
	        }

	        var sum = 0;
	        for (var i = data.length - 1; i >= 0; i--) {
	            sum += parseInt(data[i][key]);
	        }

	        return sum;
	    };
	});


angular
    .module('costs')
    .controller('categoryDetailController', categoryDetailController);

function categoryDetailController($scope, $stateParams, resources, categories) {
	$scope.resources = resources.resources;
	$scope.CATEGORY = categories[0].categories[$stateParams.categoryId - 1];
	$scope.categoryId = $stateParams.categoryId;

	$scope.showDefaultMessage = function(message) {
		$scope.defaultMessage = message;
	}

	$scope.deleteResource = function(resource, $index) {
		var index = $scope.resources.indexOf(resource);
		resources.resources.splice(index, 1);
	}

	$scope.getTotal = function() {
		var sum = 0;
		for (var i = 0; i < resources.resources.length; i++) {
			var item = resources.resources[i];

			if (item.catId == $scope.categoryId) {
				sum += item.PRICE;
			}
			continue;

		}
		return sum;
	}

	$scope.addResource = function() {
		var remain = $scope.CATEGORY.MAX_VALUE - $scope.getTotal(),
			newSum = $scope.getTotal() + $scope.PRICE;
		if (newSum > $scope.CATEGORY.MAX_VALUE) {
			$scope.showDefaultMessage("Вашего бюджета недостаточно. Вы можете потратить не более "+ remain + " руб.");
			return;
		}
		resources.resources.push({
			id: resources.resources.length + 1,
			catId: $stateParams.categoryId,
			name: $scope.name,
			PRICE: $scope.PRICE
		});
		$scope.showDefaultMessage($scope.name +" успешно добавлен.");
		$scope.name = "";
		$scope.PRICE = "";
	}


}
angular
    .module('costs')
    .controller('planController', planController);

function planController($scope, categories) {
	$scope.categories = categories[0].categories;
	$scope.defaultCosts = categories[1].defaultCosts;

	$scope.showDefaultMessage = function(message) {
		$scope.defaultMessage = message;
	}

	$scope.showCategoriesMessage = function(message) {
		$scope.categoriesMessage = message;
	}

	$scope.catList = { MAX_VALUES: [] };

	$scope.setCategoriesValue = function() {
		$scope.categories.forEach(function(item, i) {
			$scope.catList.MAX_VALUES.push(item.MAX_VALUE);
		});
	}

	$scope.setCategoriesValue();

	$scope.DEFAULT_VALUE = $scope.defaultCosts[0].DEFAULT_VALUE;

	$scope.setDefaultCost = function() {
		var sum = 0;

		$scope.categories.forEach(function(item, i) {
			sum += item.MAX_VALUE;
		});

		if ($scope.DEFAULT_VALUE == $scope.defaultCosts[0].DEFAULT_VALUE) {
			$scope.showDefaultMessage("Ваш бюджет не изменился.");
			return;
		}

		if ($scope.DEFAULT_VALUE < sum) {
			$scope.showDefaultMessage("Уменьшите бюджет для ваших категорий.");
			return;		
		}

		$scope.defaultCosts[0].DEFAULT_VALUE = $scope.DEFAULT_VALUE;
		$scope.showDefaultMessage("Бюджет успешно сохранён.");
	}


	$scope.setCategoriesCost = function() {
		var sum = 0,
			flag = false;

		$scope.categories.forEach(function(item, i) {
			sum += $scope.catList.MAX_VALUES[i];

			if (sum > $scope.defaultCosts[0].DEFAULT_VALUE) {
				$scope.showCategoriesMessage("Вы превысили максимальный бюджет, откорректируйте введённые значения и попробуйте сохранить ещё раз.");
				flag = false;
				return;
			}
			
			item.MAX_VALUE = $scope.catList.MAX_VALUES[i];
			flag = true;
			$scope.showCategoriesMessage("Бюджет для ваших категорий установлен.");
		});

		if (flag) $scope.defaultCosts[0].CURRENT_VALUE = sum;

	}
}
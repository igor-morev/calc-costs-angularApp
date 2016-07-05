angular
    .module('costs')
    .controller('planController', planController);

function planController(Categories) {
	var vm = this;

	vm._Categories = Categories;

	vm.categories = [];
	vm.defaultCosts = [{
		id: "",
		CURRENT_VALUE: 0,
		DEFAULT_VALUE: 0
	}];

	getCategories();

	function getCategories() {
		vm._Categories.getCategories()
		.then(
			successData, 
			errorData
		);

		function successData(response) {
			vm.categories = response.data;
		}

		function errorData(response) {
			console.log(response);
		}
	}

	getDefault();

	function getDefault() {
		vm._Categories.getDefault()
			.then(
				successData, 
				errorData
			)

		function successData(response) {
			vm.defaultCosts = response.data;
		}

		function errorData(response) {
			console.log(response);
		}
	}


	vm.showDefaultMessage = function(message) {
		vm.defaultMessage = message;
	}

	vm.showCategoriesMessage = function(message) {
		vm.categoriesMessage = message;
	}

	function sumCategoriesMax() {
		var sum = 0;

		vm.categories.forEach(function(item, i) {
			sum += +item.MAX_VALUE;
		});

		return sum;
	}

	vm.setDefaultCost = function() {
		var sum = 0;

		vm.categories.forEach(function(item, i) {
			sum += item.MAX_VALUE;
		});

		if (vm.DEFAULT_VALUE == vm.defaultCosts[0].DEFAULT_VALUE) {
			vm.showDefaultMessage("Ваш бюджет не изменился.");
			return;
		}

		if (vm.DEFAULT_VALUE < sum) {
			vm.showDefaultMessage("Уменьшите бюджет для ваших категорий.");
			return;		
		}

		vm.defaultCosts[0].DEFAULT_VALUE = vm.DEFAULT_VALUE;
		vm.showDefaultMessage("Бюджет успешно сохранён.");
	}

	vm.setCategoryCost = function(category) {
		if (sumCategoriesMax() > vm.defaultCosts[0].DEFAULT_VALUE) {
			vm.showCategoriesMessage("Вы превысили максимальный бюджет, откорректируйте введённые значения и попробуйте сохранить ещё раз.");
			return;
		}

		var data = {
			id: category.id,
			MAX_VALUE: category.MAX_VALUE
		}

		vm._Categories.updateMaxValue(data)
			.then(
				successData,
				errorData
			);

		function successData(response) {
			if (response.data) {
				console.log(response);
				vm.showCategoriesMessage("Бюджет для ваших категорий установлен.");
				getCategories();
			}
		}

		function errorData(response) {
			console.log(response);
		}

	}
}
angular
    .module('costs')
    .controller('planController', planController);

function planController(Categories) {
	var vm = this;

	vm._Categories = Categories;

	vm.categories = [];
	vm.defaultCosts = [{
		id: 1,
		CURRENT_VALUE: 0,
		DEFAULT_VALUE: 0
	}];

	getCategories();

	function getCategories(value) {
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

	vm.setDefaultCost = function() {
		if (vm.defaultCosts[0].DEFAULT_VALUE < vm._Categories.sumCategoriesMax(vm.categories)) {
			vm.showDefaultMessage("Уменьшите бюджет ваших категорий. Данные не были сохранены.");
			return;		
		}

		var data = {
			id: 1,
			DEFAULT_VALUE: vm.defaultCosts[0].DEFAULT_VALUE
		}

		vm._Categories.updateDefault(data)
			.then(
				successData,
				errorData
			);

		function successData(response) {
			if (response.data) {
				vm.showDefaultMessage("Максимальный бюджет установлен.");
				getDefault();
			}
		}

		function errorData(response) {
			console.log(response);
		}
	}

	vm.setCategoryCost = function(category) {
		if (vm._Categories.sumCategoriesMax(vm.categories) > vm.defaultCosts[0].DEFAULT_VALUE) {
			getCategories();
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
				vm.showCategoriesMessage("Бюджет для ваших категорий установлен.");
				getCategories("set");
			}
		}

		function errorData(response) {
			console.log(response);
		}

	}
}
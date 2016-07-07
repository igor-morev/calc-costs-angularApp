angular
    .module('costs')
    .controller('categoriesController', categoriesController);

function categoriesController(Categories, $http) {
	var vm = this;
	vm._Categories = Categories;

	vm.categories = [];
	vm.defaultCosts = [];
	vm.resources = [];

	setCategories();

	function setCategories() {
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


	getAllResources();

	function getAllResources() {
		vm._Categories.getAllResources()
		.then(
			successData,
			errorData
		);

		function successData(response) {
			vm.resources = response.data;
		}

		function errorData(response) {
			console.log(response);
		}
	}

}
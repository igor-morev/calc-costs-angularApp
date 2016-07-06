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

function categoryDetailController($stateParams, Resources, Categories) {

	var vm = this;
	vm._Resources = Resources;
	vm._Categories = Categories;
	vm.categoryId = $stateParams.categoryId;
	vm.resources = [];

	getResources($stateParams.categoryId);

	function getResources(catId) {
		vm._Resources.getResources(catId)
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

	getCategoryIndex();

	function getCategoryIndex() {
		vm._Categories.getCategories()
		.then(
			successData, 
			errorData
		);

		function successData(response) {
			vm.CATEGORY = response.data[$stateParams.categoryId - 1];
		}

		function errorData(response) {
			console.log(response);
		}
	}


	vm.showDefaultMessage = function(message) {
		vm.defaultMessage = message;
	}

	vm.deleteResource = function(resource) {
		var index = vm.resources.indexOf(resource);

		vm._Resources.deleteResource(resource.resId)
			.then(
				successData,
				errorData
			);

		function successData(response) {
			vm.resources.splice(index, 1);
		}

		function errorData(response) {
			console.log(response);
		}
	}

	vm.addResource = function() {
		var remain = vm.CATEGORY.MAX_VALUE - vm._Resources.sumResources(vm.resources),
			newSum = vm._Resources.sumResources(vm.resources) + vm.PRICE;
		if (newSum > vm.CATEGORY.MAX_VALUE) {
			vm.showDefaultMessage("Вашего бюджета недостаточно. Вы можете потратить не более "+ remain + " руб.");
			return;
		}

		var data = {
			catId: vm.categoryId,
			name: vm.name,
			PRICE: vm.PRICE
		}

		vm._Resources.addResource(data)
			.then(
				successData,
				errorData
			);

		function successData(response) {
			if (response.data) {
				vm.showDefaultMessage(vm.name +" успешно добавлен.");
				vm.name = "";
				vm.PRICE = "";
				getResources($stateParams.categoryId);
			}
		}

		function errorData(response) {
			console.log(response);
		}

	}

}
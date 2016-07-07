angular
    .module('costs')
    .service('Categories', Categories);

function Categories($http) {
	var vm = this;

	vm.getCategories = function() {
		return $http({
			method: "GET",
			url: "http://s2.localhost/api/categories/"
		})
	}

	vm.getAllResources = function(catId) {
		return $http({
			method: "GET",
			url: "http://s2.localhost/api/resources/" 
		})
	}


	vm.updateMaxValue = function(data) {
		return $http({
			method: "POST",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data,
			url: "http://s2.localhost/api/categories"
		})
	}

	vm.getDefault = function() {
		return $http({
			method: "GET",
			url: "http://s2.localhost/api/default/"
		})
	}

	vm.updateDefault = function(data) {
		return $http({
			method: "POST",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: data,
			url: "http://s2.localhost/api/default"
		})
	}

	vm.sumCategoriesMax = function (categories) {
		var sum = 0;

		categories.forEach(function(item, i) {
			sum += +item.MAX_VALUE;
		});

		return sum;
	}


	vm.sumResourcesCatId = function (resources, catId) {
		var sum = 0;

		resources.forEach(function(item, i) {
			if (item.catId === catId) {
				sum += +item.PRICE;
			};
		});

		return sum;
	}

}
angular
    .module('costs')
    .service('Categories', Categories);

function Categories($http) {
	var vm = this;

	vm.getCategories = function() {
		return $http({
			method: "GET",
			url: "http://s2.localhost/api/categories"
		})
	}


	vm.getDefault = function() {
		return $http({
			method: "GET",
			url: "http://s2.localhost/api/default"
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

}
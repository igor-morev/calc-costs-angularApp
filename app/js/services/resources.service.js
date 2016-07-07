angular
    .module('costs')
    .service('Resources', Resources);


function Resources($http, $state) {
	var vm = this;

	vm.getResources = function(catId) {
		return $http({
			method: "GET",
			url: "http://s2.localhost/api/resources/" + catId + "/" 
		})
	}

	vm.addResource = function(resource) {
		return $http({
			method: "POST",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: resource,
			url: "http://s2.localhost/api/resources" 
		})
	}

	vm.deleteResource = function(resId) {
		return $http({
			method: "OPTIONS",
			url: "http://s2.localhost/api/resources/" + resId
		})
	}

	vm.sumResources = function(resources) {
		var sum = 0;

		resources.forEach(function(item, i) {
			sum += +item.PRICE;
		});

		return sum;
	}
}
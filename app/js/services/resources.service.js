angular
    .module('costs')
    .service('Resources', Resources);


function Resources($http, $stateParams) {
	var vm = this;

	vm.getResources = function() {
		return $http({
			method: "GET",
			url: "http://s2.localhost/api/resources/" + $stateParams.categoryId + "/" 
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
}
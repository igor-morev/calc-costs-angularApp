angular
    .module('costs')
    .controller('categoriesController', categoriesController);

function categoriesController($scope, categories, resources) {
	$scope.categories = categories[0].categories;
	$scope.defaultCosts = categories[1].defaultCosts;
}
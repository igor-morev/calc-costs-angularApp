angular
    .module('costs')
    .controller('default', defaultController);

function defaultController($scope, defaultCosts) {
	$scope.defaultCosts = defaultCosts.defaultCosts;
}
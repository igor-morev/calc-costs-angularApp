'use strict';

angular
    .module('costs', ['ui.router']);


angular
    .module('costs')
    .config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('category', {
		url: "/",
		templateUrl: "views/category.html",
		controller: categoriesController
    })
    .state('category-detail', {
		url: "/detail/{categoryId}",
		templateUrl: "views/category-detail.html",
		controller: categoryDetailController
    })
    .state('costs-plan', {
		url: "/planning",
		templateUrl: "views/costs-plan.html",
		controller: planController
    })
});
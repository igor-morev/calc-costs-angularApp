'use strict';

angular
    .module('costs', ['ui.router']);


angular
    .module('costs')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('categories', {
		url: "/",
		templateUrl: "views/categories.html",
		controller: 'categoriesController',
		controllerAs: '$ctrl'
    })
    .state('category', {
		url: "/detail/{categoryId}",
		templateUrl: "views/category-detail.html",
		controller: 'categoryDetailController',
		controllerAs: '$ctrl'
    })
    .state('costs-plan', {
		url: "/planning",
		templateUrl: "views/costs-plan.html",
		controller: 'planController',
		controllerAs: '$ctrl'
    })
});
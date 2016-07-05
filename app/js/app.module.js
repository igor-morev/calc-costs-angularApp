'use strict';

angular
    .module('costs', ['ui.router']);


angular
    .module('costs')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('category', {
		url: "/",
		templateUrl: "views/category.html",
		controller: 'categoriesController',
		controllerAs: '$ctrl'
    })
    .state('category-detail', {
		url: "/detail/{categoryId}",
		templateUrl: "views/category-detail.html",
		controller: 'categoryDetailController',
		controllerAs: '$ctrl',
		resolve: {
			categoryTotal: function() {
				return true
			}
		}
    })
    .state('costs-plan', {
		url: "/planning",
		templateUrl: "views/costs-plan.html",
		controller: 'planController',
		controllerAs: '$ctrl'
    })
});
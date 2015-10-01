/**
 * Created by jmccommas on 9/30/15.
 */


var ngsocial = angular.module('ngsocial', [
	'ngRoute',
	'ngFacebook'
]);

ngsocial.config(function ($routeProvider) {
	$routeProvider
		.when('/facebook', {
			templateUrl: '../facebook/facebook.html',
			controller: 'facebookController'
		})
		.when('/about', {
			templateUrl: '../about/about.html',
			controller: 'ShowOrdersController'
		})
		.otherwise({
			redirectTo: '/facebook'
		});
});
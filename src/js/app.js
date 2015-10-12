'use strict';


var app = angular.module('app', [
	'ngAnimate',
	'ngAria',
	'ngCookies',
	'ngMessages',
	'ngResource',
	'ngSanitize',
	'ngTouch',
	'ngStorage',
	'ui.router',
	'ui.bootstrap',
	'ui.utils',
	'ui.load',
	'ui.jq',
	'oc.lazyLoad',
	// 'globalConfig',
	'pascalprecht.translate',
	'ngMaterial',
	'restangular'
]);
app.config(['RestangularProvider',
		function(RestangularProvider) {
			RestangularProvider.setBaseUrl('http://localhost:1337');
			RestangularProvider.setDefaultHttpFields({
				withCredentials: true
			});
			RestangularProvider.setRestangularFields({
			  id: "_id"
			});
		}
	])
	.factory('LoggedInRestangular', ['$localStorage', 'Restangular', function($localStorage, Restangular) {
		return Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer.setDefaultHeaders({
				// api_key: configuration.PRIVATE_API_KEY,
				access_token: $localStorage.tokenObj ? $localStorage.tokenObj.token : null
			});
		});
	}]);
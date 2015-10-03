'use strict';


angular.module('app', [
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
	'pascalprecht.translate',
	'ngMaterial',
	'restangular'
]).config(['RestangularProvider',
		function(RestangularProvider) {
			RestangularProvider.setBaseUrl('http://localhost:1337');
			RestangularProvider.setDefaultHttpFields({withCredentials: true});
		}
	]).factory('LoggedInRestangular', ['$localStorage', 'Restangular', function($localStorage, Restangular) {
		return Restangular.withConfig(function(RestangularConfigurer) {
			RestangularConfigurer.setDefaultHeaders({
				access_token: $localStorage.access_token
			});
		});
	}]);
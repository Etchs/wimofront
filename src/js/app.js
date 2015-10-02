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
    'pascalprecht.translate',
    'ngMaterial',
    'restangular'
]);

app.config([ 'RestangularProvider',
    function ( RestangularProvider ) {
      RestangularProvider.setBaseUrl('http://localhost:1337');
    }]);

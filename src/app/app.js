require('angular');
require('angular-sanitize');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-ui-bootstrap');
require('angular-cookies');
require('ngstorage');
require('ngmap');
require('angularjs-geolocation');

require('./directives/pagination');
require('./components/home/home.js');
require('./components/login/login.js');
require('./services/module.js');

var app = angular.module('pd-ya', ['ngCookies', 'geolocation', 'ngMap', 'ui.router', 'ngSanitize', 'ngStorage', 'ngMaterial', 'ui.bootstrap', 'pd-ya.login', 'pd-ya.home', 'cl.paging']);
require('./components/map/findMap');
require('./services/auth.js');
require('./services/restaurant');
require('./shared/header/header');
require('./common/constants');

app.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");
	
	$stateProvider
  .state('login', {
    url: "/login",
    views : {
      "" : {
        templateUrl:"app/components/login/login.html"
      }
    }
  })
	.state('home', {
		url: "/",
		views : {
			"" : {
				templateUrl:"app/components/home/home.html"
			},
			"header@home":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	})
	.state('map', {
		url: "/map",
		views : {
			"" : {
				templateUrl:"app/components/map/findMap.html"
			},
			"header@map":{
				templateUrl:"app/shared/header/header.html"
			}
		}
	});
}).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default');
}).run(['$rootScope', '$location', 'pd-ya.authSrv', function ($rootScope, $location, authSrv) {

  // Listen on path change event
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
   var user = authSrv.getAuthenticatedUser();
   if (!user) {
     $location.path('/login');
   }
  });

  // Listen on ui-router state change event
  $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
   var user = authSrv.getAuthenticatedUser();
   if (!user) {
     $location.path('/login');
   }
  });

}]);

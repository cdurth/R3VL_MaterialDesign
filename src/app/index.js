'use strict';

angular.module('app', ['ngAnimate','ui.router', 'ngCookies', 'ngLodash','ngTouch', 'ngSanitize', 'ngMaterial'])

.run(function ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		if (toState.authenticate && !AuthService.isLoggedIn()){
			// User isn’t authenticated
			setTimeout(function(){

				$state.transitionTo('home.app', {'partyID': toParams.partyID});
			}, 2000);
			event.preventDefault(); 
		}
    });
})
//########################################################################################
// Services: 
//########################################################################################
.factory('AuthService', function(SessionService) {
	return {
		login: function (user) {
		  console.log(user.partyID);
		  SessionService.partyID = user.partyID;
		  SessionService.password = user.password;
		},
		logout: function(){
			SessionService.partyID = null;
			SessionService.password = null;
		},
		isLoggedIn: function () {
		  return SessionService.partyID !== null;
		}
  	};	
})

.factory('SessionService', function () {
  return {
    partyID: null
  };
})
//########################################################################################
// Config: 
//########################################################################################
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	alert('router');
    $urlRouterProvider.otherwise('home/main');
    $stateProvider
        .state('home', {
        	views: {
        		"": {
		            templateUrl: 'app/home/partial-home.html',
		            controller: 'homeCtrl',
        		},
        		"about": {
        			templateUrl: 'app/home/partial-about.html',
        			controller: 'homeCtrl'
        		}
        	},
        	url: '/home',
        	controller: 'homeCtrl',
        	authenticate: false
        })
        .state('aboutus', {
        	views: {
        		"": {
		            templateUrl: '/partials/partial-aboutus.html',
		            controller: 'homeCtrl',
        		}
        	},
        	url: '/aboutus',
        	controller: 'homeCtrl',
        	authenticate: false
        })
        .state('home.main', {
        	url: '/main',
        	templateUrl: '/partials/partial-home-main.html',
        	authenticate: false
        })
        .state('home.create', {
            url: '/create',
            templateUrl: '/partials/partial-create.html',
            controller: 'createCtrl',
			authenticate: false
        })
        .state('home.join', {
        	url: '/join',
        	templateUrl: '/partials/partial-join.html',
			controller: 'joinCtrl',
			authenticate: false,
        })
		.state('home.app', {
        	url: '/app/:partyID',
        	templateUrl: '/partials/partial-app.html',
        	controller: 'appCtrl',
			authenticate: false
        })
        .state('admin', {
        	url: '/admin/:partyID',
        	templateUrl: '/partials/partial-admin.html',
        	controller: 'adminCtrl',
			authenticate: true,
			resolve:{
			    initialHandler: function($http, $stateParams){
			        return $http({method: 'GET', url: '/api/handler/'+$stateParams.partyID});
			    }
			}
        });
});

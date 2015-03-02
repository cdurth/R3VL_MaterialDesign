'use strict';

angular.module('app')
	.controller('homeCtrl', ['$scope','$animate', '$state', function($scope, $animate, $state){
		// Set state here so that ng-show works on about
		$scope.uiRouterState = $state;
		alert('homeCtrl');
	}]);
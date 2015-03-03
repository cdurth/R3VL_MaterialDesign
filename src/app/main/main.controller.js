'use strict';

angular.module('app')
	.controller('mainCtrl', ['$scope','$animate', '$state', function($scope, $animate, $state){
		// Set state here so that ng-show works on about
		$scope.uiRouterState = $state;
	}]);
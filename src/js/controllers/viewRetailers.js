'use strict';

/* Controllers */

// View Retailer controller
app.controller('ViewRetailersCtrl', ['$scope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $stateParams, $state, LoggedInRestangular) {
	// $scope.retailers = [];
	LoggedInRestangular.all('retailer').getList().then(
		function(retailers) {
			$scope.retailers = retailers;
		},
		function(err) {
			console.log('error getting retailers', err);
		});

	$scope.retailerDetails = function(retailer) {
		$state.go('app.page.details', {
			retailer: retailer
		});
	};

}]);
'use strict';

/* Controllers */

// View Retailer controller
app.controller('ViewRetailersCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $rootScope, $stateParams, $state, LoggedInRestangular) {
	// $scope.retailers = [];
	$scope.imageBase = configuration.API_BASE_PATH + '/retailer/getPhoto/';
	LoggedInRestangular.all('retailer').getList().then(
		function(retailers) {
			$scope.retailers = retailers;
			$rootScope.retailersNum = retailers.length;
			for (var i = 0; i < $scope.retailers.length; i++) {
				delete $scope.retailers[i].logo;
				/*var retailer = $scope.retailers[i];
				LoggedInRestangular.one('retailer', retailer._id).withHttpConfig({
					transformRequest: angular.identity,
					responseType: 'arraybuffer'
				}).get().then(
					// LoggedInRestangular.one('retailer', retailer._id).get().then(	
					function(data) {
						console.log('getting retailer\'s image');
						console.log(data);
						console.dir(data);
						retailer.image = "data:image/png; base64," + data;
					},
					function(err) {
						console.log('error getting retailer image', err);
					});*/
			};

		},
		function(err) {
			console.log('error getting retailers', err);
		});

	$scope.retailerDetails = function(retailer) {
		$state.go('app.page.details', {
			retailerId: retailer._id,
			retailer: retailer
		});
	};

}]);
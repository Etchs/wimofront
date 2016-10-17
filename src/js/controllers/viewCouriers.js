'use strict';

/* Controllers */

// View Couriers controller
app.controller('ViewCouriersCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $rootScope, $stateParams, $state, LoggedInRestangular) {
	$scope.imageBase = configuration.API_BASE_PATH + '/courier/getPhoto/';
	// $scope.couriers = [];
	LoggedInRestangular.all('courier').getList().then(
		function(couriers) {
			console.log(couriers);
			$scope.couriers = couriers;
			$rootScope.couriersNum = couriers.length;
		},
		function(err) {
			console.log('error getting couriers', err);
		});

	$scope.courierDetails = function(courier) {
		/*$state.go('app.page.', {
			courier: courier
		});*/
	};

	$scope.getStars = function(stars) {
		var arr = [];
		for (var i = 0; i < stars; i++) {
			arr.push(i);
		};
        return arr;
    };
}]);
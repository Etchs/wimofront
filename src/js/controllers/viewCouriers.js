'use strict';

/* Controllers */

// View Couriers controller
app.controller('ViewCouriersCtrl', ['$scope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $stateParams, $state, LoggedInRestangular) {
	// $scope.couriers = [];
	LoggedInRestangular.all('courier').getList().then(
		function(couriers) {
			console.log(couriers);
			$scope.couriers = couriers;
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
		console.log('okk');
		var arr = [];
		for (var i = 0; i < stars; i++) {
			arr.push(i);
		};
        return arr;
    };
}]);
'use strict';

/* Controllers */

// View Transactions controller
app.controller('ViewTransactionsCtrl', ['$scope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $stateParams, $state, LoggedInRestangular) {
	// $scope.transactions = [];
	LoggedInRestangular.all('transaction').getList().then(
		function(transactions) {
			$scope.transactions = transactions;
		},
		function(err) {
			console.log('error getting transactions', err);
		});

	$scope.transactionDetails = function(transaction) {
		/*$state.go('app.page.', {
			transaction: transaction
		});*/
	};

}]);
'use strict';

/* Controllers */

// View Transactions controller
app.controller('ViewTransactionsCtrl', ['$scope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $stateParams, $state, LoggedInRestangular) {
	// $scope.transactions = [];
	LoggedInRestangular.all('transaction').getList().then(
		function(transactions) {
			console.log(transactions);
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

	$scope.createRandom = function(){
		LoggedInRestangular.all('createRandom').post().then(function(res) {
	        $state.go('app.page.transactions', {}, {
	              reload: true
	            });
	      }, function(err) {
	        console.log('Error creating random transactions!');
	      });
	};

}]);
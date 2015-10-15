'use strict';

/* Controllers */

// View Transactions controller
app.controller('ViewTransactionsCtrl', ['$scope', '$rootScope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $rootScope, $stateParams, $state, LoggedInRestangular) {
	// $scope.transactions = [];
	LoggedInRestangular.all('transaction').getList().then(
		function(transactions) {
			console.log(transactions);
			$scope.transactions = transactions;
			$rootScope.transactionsNum = transactions.length;
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
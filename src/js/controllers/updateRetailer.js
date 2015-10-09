'use strict';

/* Controllers */

// Update Retailer controller
app.controller('UpdateRetailerCtrl', ['$scope', '$stateParams', '$localStorage', '$state', 'LoggedInRestangular', function($scope, $stateParams, $localStorage, $state, LoggedInRestangular) {
  // $scope.retailer = $stateParams.retailer;

  $scope.updateRetailer = function() {
    $window._.each($scope.retailer, function(val, key) {
      if ($window._.isNull(val) || $window._.isUndefined(val)) {
        delete $scope.retailer[key];
      }
    });

    $scope.retailer.put().then(function(updatedRetailer) {
      success(updatedRetailer);
    }, function(err) {
      error(err);
    });
  };

  $scope.regenerateApiKey = function(apiKey){
    $scope.retailer.post('apikey/regenerate', apiKey).then(function(updatedApiKey) {
      // TODO: update token of apiKey record in $scope.retailer.apiKeys array where apiKey.token (old apikey) = apiKey.token of the record
    }, function(err) {
      console.log(err);
    });
  };

}]);
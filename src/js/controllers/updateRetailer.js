'use strict';

/* Controllers */

// Update Retailer controller
app.controller('UpdateRetailerCtrl', ['$scope', '$stateParams', '$localStorage', '$state', '$window', 'LoggedInRestangular', function($scope, $stateParams, $localStorage, $state, $window, LoggedInRestangular) {
  // $scope.retailer = $stateParams.retailer;
  $scope.perCourierInfo = {};
  $scope.couriers = [];
  LoggedInRestangular.all('courier').getList().then(
    function(couriers) {
      console.log(couriers);
      $scope.couriers = couriers;
      for (var i = 0; i < couriers.length; i++) {
        var courier = couriers[i];
        perCourierInfo[courier._id]={markup:{}};
        var courierInfo = $window._.findWhere($scope.retailer.perCourierInfo, {_id: courier._id});
        if(courierInfo){
          perCourierInfo[courier._id].markup.category = courierInfo.markup.category;
          perCourierInfo[courier._id].markup.value = courierInfo.markup.value;
          perCourierInfo[courier._id].userName = courierInfo.userName;
          perCourierInfo[courier._id].password = courierInfo.password;
        }
      }
    },
    function(err) {
      console.log('error getting couriers', err);
    });

  $scope.updateRetailer = function() {
    var retailer = LoggedInRestangular.copy($scope.retailer);
    console.log(retailer);
    $window._.each(retailer, function(val, key) {
      if ($window._.isNull(val) || $window._.isUndefined(val)) {
        delete retailer[key];
      }
    });

    retailer.put().then(function(updatedRetailer) {
      // success(updatedRetailer);
      $state.go('app.page.retailers');
    }, function(err) {
      console.log(err);
    });
  };

  $scope.cancel = function(){
    $state.go('app.page.retailers');
  };

  $scope.courierActivated = function(courier){
    var result = false;
    var couriersIds = $window._.pluck($scope.couriers, '_id');
    if ($window._.contains(couriersIds, courier._id)){
      result = true;
    }
    return result;
  };

  // Update the selection when a checkbox is clicked.
  $scope.updateSelection = function($event, courier) {
      var checkbox = $event.target;
      var action = (checkbox.checked ? 'add' : 'remove');
      if (action == 'add' && !$window._.find($scope.retailer.couriers, function(rcourier){ return courier._id == courier._id; })) $scope.retailer.couriers.push(courier);
      if (action == 'remove' && $window._.find($scope.retailer.couriers, function(rcourier){ return courier._id == courier._id; })){
        $scope.retailer.couriers = $window._.reject($scope.retailer.couriers, function(rcourier){ return courier._id == courier._id; });
      }
  };
  // $scope.activateCourier = function(courier){
  //   $scope.retailer.couriers.push(courier);
  // };

  $scope.regenerateApiKey = function(apiKey){
    $scope.retailer.post('apikey/regenerate', apiKey).then(function(updatedApiKey) {
      // TODO: update token of apiKey record in $scope.retailer.apiKeys array where apiKey.token (old apikey) = apiKey.token of the record
    }, function(err) {
      console.log(err);
    });
  };

}]);
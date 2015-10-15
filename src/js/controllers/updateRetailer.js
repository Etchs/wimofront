'use strict';

/* Controllers */

// Update Retailer controller
app.controller('UpdateRetailerCtrl', ['$scope', '$stateParams', '$localStorage', '$state', '$window', 'LoggedInRestangular', function($scope, $stateParams, $localStorage, $state, $window, LoggedInRestangular) {
  // $scope.retailer = $stateParams.retailer;
  $scope.perCourierInfo = {};
  $scope.couriers = [];
  var retailerId = $stateParams.retailerId;
  LoggedInRestangular.one('retailer', retailerId).get().then(  
    function(retailer) {
      delete retailer.logo;
      $scope.retailer = retailer;

      LoggedInRestangular.all('transaction').getList().then(
        function(transactions) {

          var filteredTransactions = $window._.filter(transactions, function(transaction){
            if(transaction.retailerId._id == $scope.retailer._id){
              return true;
            } else {
              return false;
            }
          });
          $scope.retailerTransactionsNum = filteredTransactions.length;

        },
        function(err) {
          console.log('error getting transactions', err);
        });

      LoggedInRestangular.all('courier').getList().then(
        function(couriers) {
          console.log(couriers);
          $scope.couriers = couriers;
          for (var i = 0; i < couriers.length; i++) {
            var courier = couriers[i];
            $scope.perCourierInfo[courier._id]={markup:{}};
            var courierInfo = $window._.findWhere($scope.retailer.perCourierInfo, {courierId: courier._id});
            if(courierInfo){
              if(courierInfo.markup && courierInfo.markup.category){
                $scope.perCourierInfo[courier._id].markup.category = courierInfo.markup.category;
              }
              if(courierInfo.markup && courierInfo.markup.value){
                $scope.perCourierInfo[courier._id].markup.value = courierInfo.markup.value;
              }
              if(courierInfo.userName)
                $scope.perCourierInfo[courier._id].userName = courierInfo.userName;
              if(courierInfo.password)
                $scope.perCourierInfo[courier._id].password = courierInfo.password;
            }
          }
        },
        function(err) {
          console.log('error getting couriers', err);
        });
    },
    function(err) {
      console.log('Error getting retailer', err);
    });
  $scope.imageBase = configuration.API_BASE_PATH + '/retailer/getPhoto/';

  

  $scope.updateRetailer = function() {
    if (!this.retailerForm.$invalid) {
      $scope.retailer.perCourierInfo = $window._.map($scope.perCourierInfo, function(courierInfo, courierId){
        var result = {
          courierId: courierId
        };
        if(!$window._.isEmpty(courierInfo.markup)){
          result.markup = courierInfo.markup;
        }
        if(courierInfo.userName && courierInfo.password){
          result.userName = courierInfo.userName;
          result.password = courierInfo.password;
        }
        return result;
      });
      var retailer = LoggedInRestangular.copy($scope.retailer);
      delete retailer.logo;
      retailer.couriers = $window._.pluck($scope.retailer.couriers, '_id');
      console.log('retailer');
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
    }
  };

  $scope.cancel = function(){
    $state.go('app.page.retailers');
  };

  $scope.courierActivated = function(courier){
    var result = false;
    var couriersIds = $window._.pluck($scope.retailer.couriers, '_id');
    if ($window._.contains(couriersIds, courier._id)){
      result = true;
    }
    return result;
  };

  // Update the selection when a checkbox is clicked.
  $scope.updateSelection = function($event, courier) {
      var checkbox = $event.target;
      var action = (checkbox.checked ? 'add' : 'remove');
      if (action == 'add' && !$window._.find($scope.retailer.couriers, function(rcourier){ return rcourier._id == courier._id; })) $scope.retailer.couriers.push(courier);
      if (action == 'remove' && $window._.find($scope.retailer.couriers, function(rcourier){ return rcourier._id == courier._id; })){
        $scope.retailer.couriers = $window._.reject($scope.retailer.couriers, function(rcourier){ return rcourier._id == courier._id; });
      }
  };
  // $scope.activateCourier = function(courier){
  //   $scope.retailer.couriers.push(courier);
  // };

  $scope.regenerateApiKey = function(apiKey){
    $scope.retailer.post('apikey/regenerate', apiKey).then(function(updatedApiKey) {
      // TODO: update token of apiKey record in $scope.retailer.apiKeys array where apiKey.token (old apikey) = apiKey.token of the record
      $window._.each($scope.retailer.apiKeys, function(apiKeyRecord) {
        if (apiKeyRecord.token==apiKey.token) {
          apiKeyRecord.token = updatedApiKey.token;
        }
      });
    }, function(err) {
      console.log(err);
    });
  };

}]);
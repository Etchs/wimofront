'use strict';

/* Controllers */

// View Retailer controller
app.controller('ViewRetailerCtrl', ['$scope', '$stateParams', '$state', 'LoggedInRestangular', function($scope, $stateParams, $state, LoggedInRestangular) {
  $scope.retailer = $stateParams.retailer;
  $scope.imageBase = configuration.API_BASE_PATH + '/retailer/';
  /*$scope.retailer = {
    accountStatus: false,
    name: 'Namshi',
    category: 'E-commerce',
    deliveries: 122500,
    totalIncome: 21000121,
    contactInfo: {
      email: 'retailer.email@domain.com',
      phone: '0123456789',
      address: 'Address'
    },
    apiKeys: [{
      token: 'LSDAS1231aA',
      expired: false,
      category: 'testing'
    },{
      token: 'DEVSDAS31aC',
      expired: false,
      category: 'production'
    }]
  };*/

}]);
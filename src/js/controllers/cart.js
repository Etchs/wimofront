'use strict';

/* Controllers */
  // signin controller
app.controller('SubmitCart', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.page.neworder');
        }
      }, function(x) {
        $state.go('app.page.neworder');
        //$scope.authError = 'Server Error';
      });
    };
  }])
;
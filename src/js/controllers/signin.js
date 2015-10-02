'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'restangular', function($scope, $http, $state, restangular) {
  $scope.user = {};
  var loginData = {
    email: $scope.user.email,
    password: $scope.user.password
  };

  $scope.login = function() {
      restangular.one('auth').post('login', loginData).then(function(data) {
        alert("succ");
        console.log(data);
      }, function(err) {
        alert("error");
        console.log(err);
      });

    };
    /*
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
      */
}]);

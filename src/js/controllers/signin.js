'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$localStorage', 'Restangular', function($scope, $http, $state, $localStorage, Restangular) {
  $scope.user = {};

  if ($localStorage.access_token) {
    $state.go('app.dashboard-v1');
  }

  $scope.login = function() {
      Restangular.all('auth/login').post($scope.user).then(function(data) {
        // alert("succ");
        console.log(data);
        Restangular.one('user/jwt').get().then(
            function (tokenObj) {
              console.log(tokenObj);
              $localStorage.access_token = tokenObj.token;
              $state.go('app.page.neworder');
            },
            function (err) {
              $scope.authError = 'Something went wrong! Please try again later.';
              console.log(err);
            });

      }, function(err) {
        // alert("error");
        console.log(err);
        if(err && err.data && err.data.error && typeof err.data.error == 'string'){
          $scope.authError = err.data.error;
        } else {
          $scope.authError = 'Something went wrong! Please try again later.';
        }
        
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



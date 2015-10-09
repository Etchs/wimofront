'use strict';

/* Controllers */
// signout controller
app.controller('SignoutFormController', ['$scope', '$state', 'LoggedInRestangular','$localStorage', function($scope, $state, LoggedInRestangular,$localStorage) {
  $scope.user = {};

  $scope.logout = function() {
      LoggedInRestangular.all('auth/logout').post().then(
        function (res) {
          console.log('res');
          console.log(res);
          $localStorage.tokenObj = null;
          $localStorage.me = null;
          $state.go('access.signin');
        },
        function (err) {
          console.log(err);
        });
    };
}]);

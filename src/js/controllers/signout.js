'use strict';

/* Controllers */
// signout controller
app.controller('SignoutFormController', ['$scope', '$state', 'LoggedInRestangular', function($scope, $state, LoggedInRestangular) {
  $scope.user = {};

  $scope.logout = function() {
      LoggedInRestangular.all('auth/logout').post().then(
        function (res) {
          console.log('res');
          console.log(res);
          $state.go('access.signin');
        },
        function (err) {
          console.log(err);
        });
    };
}]);

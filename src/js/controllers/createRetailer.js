'use strict';

/* Controllers */

  // Create Retailer form controller
app.controller('CreateRetailerCtrl', ['$scope', '$localStorage', '$state', 'FileUploader', 'LoggedInRestangular', function($scope, $localStorage, $state, FileUploader, LoggedInRestangular) {
    var uploader = $scope.uploader = new FileUploader({
      url: configuration.API_BASE_PATH + '/retailer',
      headers: {
        access_token: $localStorage.tokenObj ? $localStorage.tokenObj.token : null
      }
    });

    uploader.onBeforeUploadItem = function (item) {
      // item.headers.fileName = item._file.name;
      item.headers.retailer = $scope.retailer;
    };

    uploader.onSuccessItem = function (fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
      $state.go('app.page.retailers');
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
      $scope.error = 'Error uploading logo please try again later';
    };

    $scope.createRetailer = function(){
      LoggedInRestangular.all('retailer').post({retailer: $scope.retailer}).then(function(createdRetailer) {
        $state.go('app.page.retailers');
      }, function(err) {
        $scope.error = 'Error creating new eRetailer!';
      });
    };

}]);
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

    uploader.onAfterAddingFile = function (fileItem) {
      $scope.fileAdded = true;
      console.info('onAfterAddingFile', fileItem);
    };

    uploader.onBeforeUploadItem = function (item) {
      console.log($scope.retailer);
      item.headers.fileName = item._file.name;
      item.headers.retailer = JSON.stringify($scope.retailer);
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
      console.log('$scope.retailer');
      console.log($scope.retailer);
      LoggedInRestangular.all('retailer').post({retailer: JSON.stringify($scope.retailer)}).then(function(createdRetailer) {
        $state.go('app.page.retailers');
      }, function(err) {
        $scope.error = 'Error creating new eRetailer!';
      });
    };

}]);
'use strict';

/* Controllers */

  // Form controller
app.controller('CreateInvoice', ['$scope', function($scope) {


    $scope.val = 15;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.val = val;
      });
    };


    angular.element("#LinkInput").bind('click', function (event) {
      event.stopPropagation();
    });

    $scope.datePicker = function (start, end, label) {
      
    }
}]);

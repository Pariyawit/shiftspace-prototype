'use strict';

app
.controller('EnquiryCtrl', ['$scope','$location','$routeParams','API',
function ($scope,$location,$routeParams,API) {

  $scope.showForm = true;
  $scope.showComplete = false;

  $scope.sendEnquiry = function(){
    $scope.showForm = false;

    setTimeout(function(){
      $scope.showComplete = true;
      $scope.$apply();
    }, 2000);
    
  }
}]);
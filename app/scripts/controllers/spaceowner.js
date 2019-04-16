'use strict';

app
.controller('SpaceOwnerCtrl', ['$scope','$location','$routeParams','API',
function ($scope,$location,$routeParams,API) {
 $scope.page = 'viewproposal';

 $scope.showList = true;
 $scope.showEnquiry = false;
 $scope.Back = function(){

   $scope.showList = true;
   $scope.showEnquiry = false;
 }
 $scope.viewEnquiry = function(){

   $scope.showList = false;
   $scope.showEnquiry = true;
 }

}]);

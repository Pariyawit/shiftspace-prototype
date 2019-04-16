'use strict';

app
.controller('SpacePreviewCtrl', ['$scope', '$location', '$routeParams', 'API', 
          'Aminity','Demographic','Facility','Payment','PurposeOfSpace','PurposeOfUse','StoreType','NgMap',
    function ($scope, $location, $routeParams, API, 
          Aminity, Demographic, Facility, Payment, PurposeOfSpace, PurposeOfUse, StoreType,
      NgMap) {
      var spaceId = $routeParams.spaceId;
      $scope["PurposeOfUse"] = PurposeOfUse;
      $scope["Payment"] = Payment;
      $scope["Demographic"] = Demographic;
      $scope["Aminity"] = Aminity;
      $scope["StoreType"] = StoreType;
      $scope[""] = Aminity;
      // $scope["space"] = {};
      getSpaceDetail(spaceId);
      function getSpaceDetail(spaceId){
        API.getSpaceDetail(spaceId).then(function(space){
          $scope["space"] = space;
          console.log(space);
          // $scope["space"].spaceId = space.spaceId;
          // $scope["space"].ownerId = space.ownerId;

          // console.log(space);
        },function(error){
          console.log("ERROR");
          console.log(error);
      })};



      // NgMap.getMap().then(function(map) {
      //   console.log(map.getCenter());
      //   console.log('markers', map.markers);
      //   console.log('shapes', map.shapes);
      // });
      
    }
]);

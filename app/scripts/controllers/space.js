'use strict';

app
.controller('SpaceCtrl', ['$scope', '$location', '$routeParams', 'API', 'Store', 'NgMap',
    function ($scope, $location, $routeParams, API, Store, NgMap) {
      var spaceId = $routeParams.spaceId;
      // console.log(spaceId);
      spaceId = spaceId-1;
      // $scope.sendEnquiry = function(){
      //   $scope.go('enquiry/'+spaceId);
      // }
      $('.modal').modal('hide');
      $('.modal-backdrop').remove();
      $scope["enquiry"] = {};
      $scope['store'] = Store[spaceId];
      var store = $scope['store'];
      $scope['images'] = store["images"];

      NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
      });

      $scope.sendEnquiry = function(isValid){

         $scope.$broadcast('show-errors-check-validity');
         
         if(isValid){
          var enquiry = $scope.enquiry;
          enquiry.id = ""+spaceId;
          var appearDate =  $('#appear-date').data("DateTimePicker").date()
          var disappearDate =  $('#disappear-date').data("DateTimePicker").date()
          enquiry.appearDate =  moment(appearDate).format('DD/MM/YYYY'); //23/09/2016
          enquiry.disappearDate =  moment(disappearDate).format('DD/MM/YYYY');

          console.log(enquiry);
            $('#sendEnquiry').modal('hide');
          API.Booking(enquiry).then(function(enquiry){            
            $('#enquiryComplete').modal('show');
            console.log("success");
          },function(error){       
            $('#enquiryError').modal('show');
            console.log(error);
          });
        }
      }
      
    }
]);

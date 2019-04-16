'use strict';

app
.controller('AddSpaceCtrl', ['$scope','$location', '$window', 'API', 'Storage',
  function ($scope, $location, $window, API, Storage) {
    $scope.go = function(path){
      $location.path(path);
    }
    var ownerId = Storage.Get("ownerId");
    var spaceId = Storage.Get("spaceId");
    Storage.Clear("substep");
    console.log(ownerId);
    console.log(spaceId);
    // API.addSpaceStatus(ownerId).then(function(res){
    //     $scope["step2Done"] = res.step2;
    //     $scope["step3Done"] = res.step3;  
    // }, function(error){
    //     alert(error);
    // });

    $scope["showStep"] = 'views/owner/step-add-space/main-step.html';
    $scope["step1done"] = Storage.Get("step1done");
    $scope["step2done"] = Storage.Get("step2done");
    $scope["step3done"] = Storage.Get("step3done");
    // var spaceId = Storage.Get("spaceId");
    // console.log(spaceId);

    $scope["Preview"] = function(){
        $location.path('/space-preview/'+spaceId)
    }
    //'views\owner\step-add-space\main-step.html'
    // $scope["showStep"] = 'main-step';
    console.log($scope["showStep"]);
    $scope["step"] = "step1"
    

}]);

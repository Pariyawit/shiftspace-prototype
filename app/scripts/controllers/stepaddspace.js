'use strict';
app
.controller('StepAddSpaceCtrl', ['$scope','$location', '$window', '$routeParams', 'StoreType',
  function ($scope, $location, $window, $routeParams, StoreType) {
    $scope.go = function(path){
      $location.path(path);
    }
    console.log("HELLO STEP ADD SPACE CTRL");
    // $scope["space"] = {};
    // $scope.space.type = 1;
    // $scope["step2Done"] = false;
    // $scope["step3Done"] = false;
    // //'views\owner\step-add-space\main-step.html'
    // // $scope["showStep"] = 'main-step';
    // // var step = $routeParams.step;
    // console.log($routeParams.step);
    // $scope["step"] = $routeParams.step;
    // $scope["stepNo"] = 1;
    // $scope["stepDesc"] = "กำหนดข้อมูลพื้นฐาน"
    // $scope["substep"] = 1;

    // var step = $scope["step"];
    // var substep = $scope["substep"];
    // $scope["showStep"] = 'views/owner/step-add-space/'+step+'/'+substep+'.html';
    // $scope["StoreType"] = StoreType;

    // //---- step 1 
    // $scope["spaceType"] = 1;
    // // var subtype = $scope["spaceType"];
    // // $scope["StoreSubType"] = StoreType[subtype-1].subType;
    // // console.log($scope["StoreSubType"]);
    
    // $scope["changeSubType"] = function(newValue){
    //     // console.log(newValue);
    //     var type = newValue-1;
    //     $scope.space.subtype = null;
    //     console.log(type);
    //     if(type>=0){
    //         $scope["StoreSubType"] = StoreType[type].subType;
    //     }
    //     else{
    //         $scope["StoreSubType"] = {};
    //     }
    // }

}]);

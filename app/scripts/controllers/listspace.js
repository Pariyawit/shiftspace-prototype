'use strict';

app
  .controller('ListSpaceCtrl', ['$scope','$location', '$window', 'Store', 'Storage', 'API',
    function ($scope, $location, $window, Store, Storage, API) {
      $scope.go = function(path){
        $location.path(path);
      }

      // Storage.Set("Space", {});
      // Storage.Set("substep", 1);
      localStorage.clear();

      $scope.owner = {};
      $scope.isError = false;
      $scope.RegisterOwner = function(){
        $scope.isError = false;
        if($scope.owner.name == null || $scope.owner.tel == null || $scope.owner.email == null){
          $scope.errorMessage = "กรุณากรอกข้อมูลให้ครบถ้วน";
          $scope.isError = true;
          return;
        }else{
          if($scope.owner.tel){
            var tel = $scope.owner.tel;
            var isnum = /^\d+$/.test(tel);
            if(!isnum){
              $scope.errorMessage = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง";
              $scope.isError = true;
              return;
            }else if($scope.owner.tel.length < 10){
              $scope.errorMessage = "กรุณากรอกเบอร์โทรศัพท์ให้ครบถ้วน";
              $scope.isError = true;
              return;
            }
          }
        }
        API.registerOwner($scope.owner).then(function(res){
          console.log(res)
          Storage.Set("ownerId",res.ownerId);
          $scope.go("addspace/step1");
        }, function(){
          Storage.Set("ownerId",99);
          $scope.go("addspace/step1");
          // alert("System Error")
        })
        // $scope.go("addspace/step1");
      }

}
]);

'use strict';

app
  .controller('HomeCtrl', ['$scope','$location', '$window', 'Store',
    function ($scope, $location, $window, Store) {
      $scope.go = function(path){
        $location.path(path);
      }

      $scope.clickPopup = function(){
        
          $location.path('/space/5');
        $('#popup-klandth').modal('hide');
        console.log("hide");
        setTimeout(function() {
          console.log("go");
          $scope.go('/space/5');
          $location.path('/space/5');
        }, 1000);
      }

      // console.log("home");
      // setTimeout(function() {
      //   $('#popup-klandth').modal('show');
      // }, 500);

      // filepicker.setKey(" AkBIswTuwR0qxXRYNuCEWz");
      // var s = new Store;
      // console.log(Store);
      // console.log(s);
      $scope.stores = Store;
      $scope.testimonialStyle = {
        "background-image": "url('images/testimonial-1.jpg')"
      };

      $scope.getImages = function(url){
        // console.log(url);
      }

      $scope.spaceExamples = [
        {
          "id" : 1,
          "name" : "แบ่งพื้นที่ภายในร้าน",
          "img" : "images/storetype/storetype1.jpg"
        },{
          "id" : 2,
          "name" : "แยกพื้นที่ชัดเจน<br>ภายในร้าน",
          "img" : "images/storetype/storetype2.jpg"
        },{
          "id" : 3,
          "name" : "พื้นที่ทั้งหมด<br>ของร้าน",
          "img" : "images/storetype/storetype3.jpg"
        },{
          "id" : 4,
          "name" : "ร้านในสถานที่<br>จัดกิจกรรม",
          "img" : "images/storetype/storetype4.jpg"
        },{
          "id" : 5,
          "name" : "ร้านในตลาด<br>สุดสัปดาห์",
          "img" : "images/storetype/storetype5.jpg"
        },{
          "id" : 6,
          "name" : "โชว์รูม",
          "img" : "images/storetype/storetype6.jpg"
        },{
          "id" : 7,
          "name" : "พื้นที่บูธ",
          "img" : "images/storetype/storetype7.jpg"
        },{
          "id" : 8,
          "name" : "คีออส",
          "img" : "images/storetype/storetype8.jpg"
        }
      ]

}
]);

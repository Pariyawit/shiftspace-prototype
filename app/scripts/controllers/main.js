'use strict';

app
  .controller('MainCtrl', ['$scope', '$location', '$route', '$window', '$timeout', 'API',
    function ($scope, $location, $route, $window, $timeout, API) {

      $scope.backToTop = function() {
          $("html, body").animate({ scrollTop: 0 }, 500);
      }

      $scope.go = function(path){
        $location.path(path);
      };

      $scope.register = {};
      $scope.login = {};
      $scope.search = {};
      $scope.error = {};

      // $scope.showRegister = function(){
      //   $('#myNavmenu').offcanvas('hide');
      //   setTimeout(function(){
      //     $('#registerModal').modal('show')
      //   },500)
      // };

      $scope.showAddSpaceModal = function(){
        $('#myNavmenu').offcanvas('hide');
        console.log("hide");
        setTimeout(function(){
          $('#addSpaceModal').modal('show')
        },500)
      }

      $(document).ready(function() {
        // $('#addSpaceModal').modal('show');
        $('#addSpaceModal').on('shown.bs.modal', function() {
            // $("#txtname").focus();
            console.log("event");
        })
    });
      $('#addSpaceModal').on('shown.bs.modal', function() {
          // $("#txtname").focus();
          console.log("event");
      })
      
      //FILS STACK
      filepicker.setKey("AkBIswTuwR0qxXRYNuCEWz");
      $scope.uploadFiles = function(){
        filepicker.pickMultiple(
          {
            mimetype: 'image/*',
            container: "window"
          },
          function(Blobs){
            // console.log(JSON.stringify(Blobs));
            var imgs = [];
            for(var i=0;i<Blobs.length;i++){
              var obj = Blobs[i];
              var img = {
                "caption" : obj.filename,
                "url" : obj.url
              };
              imgs.push(img);
            }
            console.log(imgs);
            $scope.register.pictures = imgs;

            $scope.error.noType = false;
            $scope.$apply();

          },
          function(error){
        //  console.log(JSON.stringify(error)); - print errors to console
          }

        );
      }
      $scope.rentTypes = [
        {
          "id" : 1,
          "name" : "แบ่งพื้นที่ภายในร้าน",
          "img" : "images/storetype/storetype1.jpg"
        },{
          "id" : 2,
          "name" : "แยกพื้นที่ชัดเจนภายในร้าน",
          "img" : "images/storetype/storetype2.jpg"
        },{
          "id" : 3,
          "name" : "พื้นที่ทั้งหมดของร้าน",
          "img" : "images/storetype/storetype3.jpg"
        },{
          "id" : 4,
          "name" : "ร้านในสถานที่จัดกิจกรรม",
          "img" : "images/storetype/storetype4.jpg"
        },{
          "id" : 5,
          "name" : "ร้านในตลาดสุดสัปดาห์",
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

      // $scope.registerForm = {};
      $scope.register.pictures = [];
      $scope.AddSpace = function(isValid){
          console.log(isValid);
          $scope.error.noPicture = false;          
          $scope.error.noSpaceType = false;
          $scope.error.noRentType = false;
          
          console.log($scope.register.type);
          if($scope.register.spaceType == null){
            $scope.error.noSpaceType = true;
          }
          if($scope.register.rentType == null){
            $scope.error.noRentType = true;
          }

         $scope.$broadcast('show-errors-check-validity');
         // if (registerForm.$valid) {
          var error = $scope.error.noPicture || $scope.error.noType;
         if (isValid && !error) {
            var register = $scope.register;
            console.log(register);
              $('#addSpaceModal').modal('hide');


            API.Register(register).then(function(result){            
              $('#addSpaceComplete').modal('show');
              console.log("success");
            },function(error){
              console.log(error);
              $('#addSpaceError').modal('show');
              console.log("success");
            });// save the user
        }
          
      }

      $scope.onlyNumbers = /^\d+$/;

      $scope["Amenities"] = ["ห้องลองชุด",
      "หลอดไฟ",
      "ปลั๊กไฟ",
      "ห้องน้ำ",
      "เครื่องปรับอากาศ",
      "กล้องวงจรปิด",
      "ห้องเก็บสินค้า",
      "ที่จอดรถ",
      "พนักงานประจำร้าน",
      "ถุงใส่สินค้า",
      "ไม้แขวนเสื้อ",
      "หุ่นโชว์เสื้อ",
      "ราวแขวน"];



      // document.ready()
      // $('img.svg').each(function(){
      //       var $img = jQuery(this);
      //       var imgID = $img.attr('id');
      //       var imgClass = $img.attr('class');
      //       var imgURL = $img.attr('src');

      //       jQuery.get(imgURL, function(data) {
      //           // Get the SVG tag, ignore the rest
      //           var $svg = jQuery(data).find('svg');

      //           // Add replaced image's ID to the new SVG
      //           if(typeof imgID !== 'undefined') {
      //               $svg = $svg.attr('id', imgID);
      //           }
      //           // Add replaced image's classes to the new SVG
      //           if(typeof imgClass !== 'undefined') {
      //               $svg = $svg.attr('class', imgClass+' replaced-svg');
      //           }

      //           // Remove any invalid XML tags as per http://validator.w3.org
      //           $svg = $svg.removeAttr('xmlns:a');

      //           // Replace image with new SVG
      //           $img.replaceWith($svg);

      //       }, 'xml');

      //   });

    angular.element(document).ready(function () {    
      activate('img[src*=".svg"]');
    });

      function activate(string){
          jQuery(string).each(function(){
              var $img = jQuery(this);
              var imgID = $img.attr('id');
              var imgClass = $img.attr('class');
              var imgURL = $img.attr('src');

              jQuery.get(imgURL, function(data) {
                  // Get the SVG tag, ignore the rest
                  var $svg = jQuery(data).find('svg');

                  // Add replaced image's ID to the new SVG
                  if(typeof imgID !== 'undefined') {
                      $svg = $svg.attr('id', imgID);
                  }
                  // Add replaced image's classes to the new SVG
                  if(typeof imgClass !== 'undefined') {
                      $svg = $svg.attr('class', imgClass+' replaced-svg');
                  }

                  // Remove any invalid XML tags as per http://validator.w3.org
                  $svg = $svg.removeAttr('xmlns:a');

                  // Replace image with new SVG
                  $img.replaceWith($svg);

              }, 'xml');
          });
      } 
}]);

'use strict';
app
.controller('AddStep1Ctrl', ['$scope','$location', '$window', '$routeParams', 'StoreType', 'Aminity', 'Facility', 'Step', 'Storage', 'API',
  function ($scope, $location, $window, $routeParams, StoreType, Aminity, Facility, Step, Storage, API) {
    $scope.getNumber = function(num) {
        return new Array(num);   
    }
    $(document).ready(function(){
        $(this).scrollTop(0);
        // adjustView();
    });
    // adjustView();
    $scope["Steps"] = [
        {
            'form' : "views/owner/step-add-space/step1/1.html",
            'helper' : "views/owner/step-add-space/step1/helper/help-1.html"
        },{
            'form' : "views/owner/step-add-space/step1/2.html",
            'helper' : "views/owner/step-add-space/step1/helper/help-2.html"
        },{
            'form' : "views/owner/step-add-space/step1/3.html",
            'helper' : "views/owner/step-add-space/step1/helper/help-3.html"
        },{
            'form' : "views/owner/step-add-space/step1/4.html",
            'helper' : "views/owner/step-add-space/step1/helper/help-4.html"
        },{
            'form' : "views/owner/step-add-space/step1/5.html",
            'helper' : "views/owner/step-add-space/step1/helper/help-5.html"
        }
    ]
                        

    $scope["maxStep"] = $scope["Steps"].length;
    $scope["stepHeader"] = "1 : ข้อมูลพื้นที่";
    $scope["requireForm"] = true;


    $scope["StoreType"] = StoreType;
    $scope["selectSubtype"] = [];

    $scope["Aminity"] = Aminity;
    $scope["Facility"] = Facility;

    $scope.go = function(path){
      $location.path(path);
    }
    
    $scope["step"] = "step1";
    if(Storage.Get('substep') != null){
        $scope["substep"] = Storage.Get('substep');
    }else{
        $scope["substep"] = 1;
        Storage.Set('substep',1)
    }
    console.log(Storage.Get('substep'));
    console.log(Storage.Get('Space'));

    if(Storage.Get('Space') != null){
        $scope["space"] = Storage.Get('Space');
    }else{        
        $scope["space"] = {};
        $scope["space"].location = {};
    }
    var step = $scope["step"];
    var substep = $scope["substep"];

    var currentStep = $scope["substep"];
    // $scope["space"].type = "1";


    //=====================================================
    // $scope.$watch(function() { return element.is(':visible') }, function() {
    //   // Do whatever should happen when the visibility changes
    //   console.log($scope.step);
    // });


    //=====================================================
    $scope["Next"] = function(step){
        console.log($scope["space"]);
        $scope["isError"] = false;

        //validate
        if(step == 1 && isErrorStep1($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }

        if(step == 2 && isErrorStep2($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }

        if(step == 3 && isErrorStep3($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }
        console.log($scope["space"]);
        if(step == 4 && isErrorStep4($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }

        if(step == 5 && isErrorStep5($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }

        if(step == 6 && isErrorStep6($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }
        if(step ==  $scope["maxStep"]){
            var ownerId=Storage.Get("ownerId");
            API.addSpaceStep1(ownerId, $scope.space).then(function(res){
                console.log(res);
                Storage.Set("spaceId",res.spaceId);
                Storage.Set("step1done",true);
                Storage.Set("step2done",false);
                Storage.Set("step3done",false);
                $scope.go('addspace');
            },function(error){
                Storage.Set("spaceId",99);
                Storage.Set("step1done",true);
                Storage.Set("step2done",false);
                Storage.Set("step3done",false)
                $scope.go('addspace');
                // alert("error from system");
            });
            $scope.go('addspace');
            return;
        }
        //next
        step = step+1;
        Storage.Set('substep',step);
        Storage.Set('Space', $scope["space"]);
        $scope["substep"] = step;
        // adjustButtons()
        // $scope["showStep"] = 'views/owner/step-add-space/step1/'+step+'.html';
        // console.log($scope.space);
    }

    $scope["Back"] = function(step){
        if(step>1){            
            step = step-1;
            $scope["substep"] = step;
            Storage.Set('substep',step);
            Storage.Set('Space', $scope["space"]);
            // adjustButtons()
            // $scope["showStep"] = 'views/owner/step-add-space/step1/'+step+'.html';
        }
    }

    $scope.init = function(){
        adjustButtons();    
    }

    $scope.$watch('substep', function() {
        console.log("substep change");
        setTimeout(adjustButtons(),2000);
    });

    //======Validation
    $scope["subtypeError"] = false;

    function isErrorStep1(space){
        var spaceType = parseInt(space.type);
        var spaceSubType = parseInt(space.subType);
        console.log(spaceType);
        console.log(spaceSubType);
        // $scope.space.subtype = $scope.selectSubtype[spaceType];
        if(spaceType == 4){
            return false;
        }
        if(spaceType == 99 || spaceSubType == 99){
            console.log("condition 2");
            if($scope.space.subtypeOther == null){
                scrollToBottom();
                $scope["subtypeError"] = true;
                return true;
            }
            return false;
        }else{
            console.log("condition 3");

            if(space.subType == null){
                console.log("condition 4");

                scrollToBottom();
                $scope["subtypeError"] = true;
                return true;
            }
            return false;
        }
        return false;
    }

     function isErrorStep2(space){
        $scope.space.area = $('#area')[0].value;
        return false;
    }

    function isErrorStep3(space){
        var tmp = false;
        $scope["locationNameError"] = false;
        $scope["locationPlaceError"] = false;
        // $scope["locationStreetError"] = false;
        // $scope["locationSubdistrictError"] = false;
        // $scope["locationDistrictError"] = false;
        // $scope["locationProvinceError"] = false;
        // $scope["locationPostcodeError"] = false;
        // $scope.space = {};
        $scope.space.location.name = $('#location-name').val()
        $scope.space.location.place = $('#location-place').val()

        if(space.location == null){
            $scope["locationNameError"] = true;
            $scope["locationPlaceError"] = true;
            // $scope["locationStreetError"] = true;
            // $scope["locationSubdistrictError"] = true;
            // $scope["locationDistrictError"] = true;
            // $scope["locationProvinceError"] = true;
            // $scope["locationPostcodeError"] = true;
            return true;
        }

        if($scope.space.location.name == null){
            console.log("NO Name");
            $scope["locationNameError"] = true;
            tmp = true;
        }
        if($scope.space.location.place == null){
            console.log("NO Place");
            $scope["locationPlaceError"] = true;
            tmp = true;
        }
        
        initializeMap()
        return tmp;
    }

    function isErrorStep4(space){
        $scope.space.gps = {};
        $scope.space.gps.x = $('#latitude').val(); 
        $scope.space.gps.y = $('#longitude').val();
        console.log($scope.space.gps);
        // console.log("Hello2")
        return false;
    }

    function isErrorStep5(space){
        return false;
    }


    $scope["changeType"] = function changeType(){
        // $scope.selectSubtype = [];
        console.log("Change Type");
        console.log($scope.space.type);
        console.log($scope.space.subType);
        $scope.space.subType = null;
        $scope.space.subtypeOther = null;
    }

    $scope["changeSubType"] = function changeSubType(){
        console.log("Change Sub Type");

        $scope.space.subtypeOther = null;
    }

    function scrollToBottom(){
        $window.scrollTo(0,document.body.scrollHeight);
    }

    $scope.scrollToBottom = function(){
        $window.scrollTo(0,document.body.scrollHeight);
    }

    angular.element(document).ready(function () {
        console.log("ready");
        adjustButtons();
    });
// //========================================================================================
    function adjustButtons() {
        var container = $('.content-container');
        console.log('adjustButtons '+$scope.substep);
        // console.log(container.offset());
        if(container.offset()){
            var buttons = $('.bottom-buttons');
            var leftOffset = container.offset().left;
            // console.log("leftOffset "+leftOffset);  
            var width = container.width();
            // buttons.css('left', leftOffset - 30 + 'px');
            buttons.css('width', width + 30+ 'px');

            var right = $('.content-container').position().left +$('.content-container').width()
            if ($(document).height() > $(window).height()) {
                right += 10;
            }
            buttons.css('right', right);

        }
        if ($(document).height() > $(window).height()) {
            console.log("box shadow");
            var buttons = $('.bottom-buttons');
            buttons.css('box-shadow', '0 -10px 10px -10px gray');
        }else{
            console.log("no shadow");
            var buttons = $('.bottom-buttons');
            buttons.css('box-shadow', 'none');
        }
    }

    function initializeMap() {
        var myLatLng = {lat: 13.7468245, lng: 100.5331226};

        var mapOptions = {
          zoom: 14,
          center: myLatLng,
          mapTypeControl: false,
            streetViewControl: false,
          // mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'),mapOptions);
        var autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('autocomplete')), {
                types: ['geocode']
            });
        $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
             //do something onclick
            .click(function(){
               var that=$(this);
               if(!that.data('win')){
                // that.data('win',new google.maps.InfoWindow({content:'this is the center'}));
                that.data('win').bindTo('position',map,'center');
               }
               that.data('win').open(map);
            });
        google.maps.event.addListener(map, 'center_changed', function() {
            // console.log("change");
            // 0.1 seconds after the center of the map has changed,
            // set back the marker position.
            window.setTimeout(function() {
              var center = map.getCenter();
              // marker.setPosition(center);
              var currentLat = center.lat();
              var currentLng = center.lng();
              $('#latitude').val(currentLat);
              $('#longitude').val(currentLng);
            }, 100);
         });
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          console.log(lat);
          console.log(lng);
          map.setCenter(place.geometry.location);
        });


      }


}]);
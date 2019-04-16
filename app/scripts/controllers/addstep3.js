'use strict';
app
.controller('AddStep3Ctrl', ['$scope','$location', '$timeout', 'Storage', 'PurposeOfSpace', 'PurposeOfUse', 'SuitableFor' ,'API',
  function ($scope, $location, $timeout, Storage, PurposeOfSpace, PurposeOfUse, SuitableFor, API) {
    $scope.getNumber = function(num) {
        return new Array(num);   
    }
    $(document).ready(function(){
        $(this).scrollTop(0);
    });
    $scope["Steps"] = [
        {
            'form' : "views/owner/step-add-space/step3/1.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-1.html"
        },{
            'form' : "views/owner/step-add-space/step3/2.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-2.html"
        },{
            'form' : "views/owner/step-add-space/step3/3.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-3.html"
        },{
            'form' : "views/owner/step-add-space/step3/4.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-4.html"
        },{
            'form' : "views/owner/step-add-space/step3/5.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-5.html"
        },{
            'form' : "views/owner/step-add-space/step3/6.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-6.html"
        },{
            'form' : "views/owner/step-add-space/step3/7.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-7.html"
        },{
            'form' : "views/owner/step-add-space/step3/8.html",
            'helper' : "views/owner/step-add-space/step3/helper/help-8.html"
        }
    ]
    $scope["maxStep"] = $scope["Steps"].length;
    $scope["stepHeader"] = "3 : จุดแบ่งพื้นที่กับ Shiftspace";
    $scope["requireForm"] = true;
    $scope["PurposeOfSpace"] = PurposeOfSpace;
    $scope["PurposeOfUse"] = PurposeOfUse;
    $scope["SuitableFor"] = SuitableFor;
    $scope["Images"] = Storage.Get("Images");
    // console.log($scope.Images[0]);


    $scope.go = function(path){
      $location.path(path);
    }
    $scope["space"] = {};
    $scope["space"].time = {};
    $scope["space"].time.open = {};
    $scope["step"] = "step3";
    $scope["substep"] = 1;
    if(Storage.Get('substep') != null){
        $scope["substep"] = Storage.Get('substep');
    }else{
        $scope["substep"] = 1;
        Storage.Set('substep',1);
        // Storage.Set('Space',{})
    }
    if(Storage.Get('Space') != null){
        $scope["space"] = Storage.Get('Space');
    }else{        
        $scope["space"] = {};
    }

    var step = $scope["step"];
    var substep = $scope["substep"];
    $scope["showStep"] = 'views/owner/step-add-space/'+step+'/'+substep+'.html';
    
    var currentStep = $scope["substep"];   
    

    $scope["Next"] = function(step){
        console.log(step);
        console.log($scope["space"]);
        $scope["isError"] = false;

        // validate
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

        if(step == 7 && isErrorStep7($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }

        if(step == 8 && isErrorStep8($scope["space"])){
            console.log("error");
            $scope["isError"] = true;
            return;
        }
        
        Storage.Set('Space', $scope["space"]);
        if(step ==  $scope["maxStep"]){
            var ownerId=Storage.Get("ownerId");
            var spaceId=Storage.Get("spaceId");
            API.addSpaceStep3(ownerId, spaceId, $scope.space).then(function(res){
                Storage.Set("step1done",true);
                Storage.Set("step2done",true);
                Storage.Set("step3done",true);
                $scope.go('addspace');
            },function(error){
                // alert("error from system");
                Storage.Set("step1done",true);
                Storage.Set("step2done",true);
                Storage.Set("step3done",true);
                $scope.go('addspace');
            });
            // $scope.go('addspace');
            return;
        }


        //next
        // if(step == 2 && ($scope.Images == null)){
        //     step++;
        // }
        step = step+1;
        Storage.Set('substep',step);
        // Storage.Set('Space', $scope["space"]);
        $scope["substep"] = step;
        // $scope["showStep"] = 'views/owner/step-add-space/step3/'+step+'.html';
        console.log($scope.space);
    }

    $scope["Back"] = function(step){
        if(step>1){            
            step = step-1;
            $scope["substep"] = step;
            Storage.Set('substep',step);
            Storage.Set('Space', $scope["space"]);
            // $scope["showStep"] = 'views/owner/step-add-space/step3/'+step+'.html';
        }
    }

    //========================Validate
    $scope.tag3 = [];
    $scope["suitOther"] = {};

    function isErrorStep1(space){
        // console.log(space);
        // console.log(space.purposeOfUse.length);
        if(space.purposeOfSpace == null || space.purposeOfSpace.length == 0){
            return true;
        }
        return false;
    }

    function isErrorStep2(space){
        // console.log(space);
        // console.log(space.purposeOfUse.length);
        if(space.purposeOfUse == null || space.purposeOfUse.length == 0){
            return true;
        }

        return false;
    }
    function isErrorStep3(space){
        if($scope.Images){
            $scope.space.spaceImg = $('.flex-active-slide img')[0].src;
        }
        console.log(space.spaceDescription);
        if(space.spaceDescription == ""){            
            $scope["spaceDescriptionError"] = true;
            return true;
        }
        return false;
    }

     function isErrorStep4(space){
        $scope.space.time = {};
        $scope.space.time.open = {};
        $scope.space.time.stockIn = {};
        $scope.space.time.stockOut = {};

        $scope.space.time.open.start = $('#time-open-start').val();
        $scope.space.time.open.end = $('#time-open-end').val();

        $scope.space.time.stockIn.start = $('#time-stockIn-start').val();
        $scope.space.time.stockIn.end = $('#time-stockIn-end').val();

        $scope.space.time.stockOut.start = $('#time-stockOut-start').val();
        $scope.space.time.stockOut.end = $('#time-stockOut-end').val();

        return false;
    }

    $scope.space.rule = {};
    $scope.space.rule.rule1 = false;
    $scope.space.rule.rule2 = false;
    $scope.space.rule.rule3 = false;
    function isErrorStep5(space){
        $scope.space.booking = {};
        $scope.space.booking.min = $('#booking-min')[0].value;
        $scope.space.booking.max = $('#booking-max')[0].value;

        return false;
    }

    function isErrorStep6(space){
        // return true;
        return false;
    }

    function isErrorStep7(space){
        // return true;
        $scope.space.price = {};
        $scope.space.price.rent = $('#price-rent').val();
        $scope.space.price.gp = {};
        $scope.space.price.gp.min = $('#price-gp-min').val();
        $scope.space.price.gp.max = $('#price-gp-max').val();
        // $scope.space.price.discount = {};
        // $scope.space.price.discount.week = $('#price-discount-week').val();
        // $scope.space.price.discount.month = $('#price-discount-month').val();
        console.log($scope);
        return false;
    }

    function isErrorStep8(space){
        // return true;
        $scope.space.price.discount = {};
        $scope.space.price.discount.week = $('#price-discount-week').val();
        $scope.space.price.discount.month = $('#price-discount-month').val();
        return false;
    }
}]);

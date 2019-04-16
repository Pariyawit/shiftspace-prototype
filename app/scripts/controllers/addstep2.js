
'use strict';
app
.controller('AddStep2Ctrl', ['$scope','$location', '$timeout', 'Storage', 'Demographic', 'Payment', 'API',
  function ($scope, $location, $timeout, Storage, Demographic, Payment, API) {
    $scope.getNumber = function(num) {
        return new Array(num);   
    }

    $scope["Steps"] = [
        {
            'form' : "views/owner/step-add-space/step2/1.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-1.html"
        },{
            'form' : "views/owner/step-add-space/step2/2.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-2.html"
        },{
            'form' : "views/owner/step-add-space/step2/3.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-3.html"
        },{
            'form' : "views/owner/step-add-space/step2/4.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-4.html"
        },{
            'form' : "views/owner/step-add-space/step2/5.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-5.html"
        },{
            'form' : "views/owner/step-add-space/step2/6.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-6.html"
        },{
            'form' : "views/owner/step-add-space/step2/7.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-7.html"
        },{
            'form' : "views/owner/step-add-space/step2/8.html",
            'helper' : "views/owner/step-add-space/step2/helper/help-8.html"
        }
    ]
    $scope["maxStep"] = $scope["Steps"].length;

    $scope["maxStep"] = 8;
    $scope["stepHeader"] = "2 : จุดเด่นพื้นที่";
    $scope["requireForm"] = false;
    $scope["Demographic"] = Demographic;
    $scope["Payment"] = Payment;
    var _MAX_TEXTAREA = 1000;

    $scope.go = function(path){
      $location.path(path);
    }
    $scope["space"] = {};
    
    $scope["step"] = "step2";
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
        $scope["space"].location = {};
    }

    if($scope["substep"] == 1){
        $scope.requireForm = false;
    }else{
        $scope["requireForm"] = true;
    }
    var step = $scope["step"];
    var substep = $scope["substep"];
    $scope["showStep"] = 'views/owner/step-add-space/'+step+'/'+substep+'.html';
    
    var currentStep = $scope["substep"];   
    

    $scope["Next"] = function(step){
        console.log($scope["space"]);
        $scope["isError"] = false;

        // validate
        if(step == 1){
            $scope["requireForm"] = true;
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

        if(step ==  $scope["maxStep"]){
            var ownerId=Storage.Get("ownerId");
            var spaceId=Storage.Get("spaceId");
            API.addSpaceStep2(ownerId, spaceId, $scope.space).then(function(res){
                console.log("SUCCESS STEP 2")
                Storage.Set("step2done",true);
                $scope.go('addspace');
            },function(error){
                // alert("System Error");
                Storage.Set("step2done",true);
                $scope.go('addspace');
            });
            // $scope.go('addspace');
            return;
        }

        //next
        step = step+1;
        Storage.Set('substep',step);
        Storage.Set('Space', $scope["space"]);
        $scope["substep"] = step;
        // $scope["showStep"] = 'views/owner/step-add-space/step2/'+step+'.html';
        console.log($scope.space);
    }

    $scope["Back"] = function(step){
        if(step>1){            
            step = step-1;
            $scope["substep"] = step;
            Storage.Set('substep',step);
            Storage.Set('Space', $scope["space"]);
            // $scope["showStep"] = 'views/owner/step-add-space/step2/'+step+'.html';
        }
    }

    $scope["descriptionCount"] = _MAX_TEXTAREA;
    $scope["step3Change"] = function(){
        console.log($scope.space.store.description);
        $scope["descriptionCount"] = _MAX_TEXTAREA-$scope.space.store.description.length;
    }
    //========================Validate
    $scope.tag3 = [];
    $scope["suitOther"] = {};
    function isErrorStep2(space){
        $scope.space.store = {};

        var tag1 = $('#tag1 input');
        var tag2 = $('#tag2 input');
        var tag3 = $scope.tag3;

        if(tag1.length>1){
            var desc = "พื้นที่ใกล้กับ ";
        }
        for(var i=0;i<tag1.length-1;i++){
            desc = desc+tag1[i].value+" ";
            if(i == tag1.length-3){
                desc+="และ"
            }
        }
        console.log(desc);

        if(tag2.length>1){
          desc += "คุณจะชอบพื้นที่นี้เพราะว่า "
        }
        for(var i=0;i<tag2.length-1;i++){
            desc = desc+tag2[i].value+" ";
            if(i == tag2.length-3){
                desc+="และ"
            }
        }
        console.log(desc);
        if(tag3.length > 0 || $scope["suitOther"].text){
            desc += "โดยพื้นที่นี้เหมาะสำหรับ "
        }
        if(tag3.length > 0){
            var suit = ["เปิดตัวสินค้าใหม่","ทดลองตลาดใหม่","จัดโปรโมชั่น"];

            for(var i=0;i<tag3.length;i++){
                desc = desc+suit[tag3[i]]+" ";
                if(i == tag3.length-2){
                    desc+="และ"
                }
            }
            console.log(desc);
        }

        console.log($scope["suitOther"].text);
        if($scope.suitOther.text){
            if(tag3.length > 0){
                desc += "รวมไปถึง"
            }
            desc += $scope["suitOther"].text;
            console.log(desc);
        }
        $scope.space.store.description = desc;
        $scope["descriptionCount"] = _MAX_TEXTAREA
        if($scope.space.store.description){
            $scope["descriptionCount"] = _MAX_TEXTAREA-$scope.space.store.description.length;
        }
        return false;
    }
    function isErrorStep3(space){
        $scope.storeDescriptionError = false;
        if($scope.space.store == null || $scope.space.store.description == null){
            $scope.storeDescriptionError = true;
            return true;
        }
        return false;
    }

    $scope["nameCount"] = _MAX_TEXTAREA
    $scope["nameCount"] = 100;
    if($scope.space.store && $scope.space.store.name){
        $scope["nameCount"] = _MAX_TEXTAREA-$scope.space.store.name.length;
    }
    $scope["step4Change"] = function(){
        console.log($scope.space.store.name);
        $scope["nameCount"] = _MAX_TEXTAREA-$scope.space.store.name.length;
    }
     function isErrorStep4(space){
        $scope.storeNameError = false;
        if(space.store == null || space.store.name == null){
            $scope.storeNameError = true;
            return true;
        }
        return false;
    }

    function isErrorStep5(space){
        $scope.space.customer = {};
        $scope.space.customer.traffic = {};
        $scope.space.customer.traffic.min = $('input[name="pass-min"]').val()
        $scope.space.customer.traffic.max = $('input[name="pass-max"]').val()

        $scope.space.customer.traction = {};
        $scope.space.customer.traction.min = $('input[name="walkin-min"]').val()
        $scope.space.customer.traction.max = $('input[name="walkin-max"]').val()

        return false;
    }

    // $scope.space.customer.sex = $('input[name="gender-min"]').val();
    function isErrorStep6(space){
        $scope.space.customer.age = {};
        $scope.space.customer.age.min = $('input[name="age-min"]').val()
        $scope.space.customer.age.max = $('input[name="age-max"]').val()
        $scope.space.customer.sex = $('input[name="gender-min"]').val()
        return false;
    }

    function isErrorStep7(space){
        return false;
    }

    function isErrorStep8(space){
        if(space.customer.payment == null){
            return true;
        }
        return false;
    }
    //======================== OTHER FUNC
    filepicker.setKey("AkBIswTuwR0qxXRYNuCEWz");
      $scope.uploadFiles = function(){
        filepicker.pickMultiple(
          {
            mimetype: 'image/*',
            // container: "modal"
            // container: "fileupload1"
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
            $scope.space.image = imgs;
            Storage.Set("Images",imgs);
            $scope["requireForm"] = true;
            $scope.error.noType = false;
            $scope.$apply();
          },
          function(error){
        //  console.log(JSON.stringify(error)); - print errors to console
          }

        );
      }
}]);

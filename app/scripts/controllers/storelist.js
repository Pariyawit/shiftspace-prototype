'use strict';

app
.controller('StoreListCtrl', ['$scope', '$window',
function ($scope, $window) {

  setTimeout(adjHeight,500);

 $(window).resize(function(){
    // alert(window.innerWidth);
    setTimeout(adjHeight,500)
 });

  function adjHeight(col_num){
    var col_num;
    if($window.innerWidth > 992){
      col_num = 3;
    }else if($window.innerWidth < 992){
      col_num = 2;
    }else if($window.innerWidth < 480){
      col_num = 0;
    }
    var maxStore = $scope.stores.length;

    for(var i=0;i<maxStore;i+=col_num){
      var maxHeight = 0;
      for(var j=0;j<col_num;j++){
      	var element_num = i+j;
        var cap = '#cap-'+element_num;
        var eCap = angular.element( document.querySelector( cap ));
        eCap.height("auto");
        maxHeight = max(eCap.height(), maxHeight);
      }
 
      for(var j=0;j<col_num;j++){
      	var element_num = i+j;
  
        var cap = '#cap-'+element_num;
        var eCap = angular.element( document.querySelector( cap ));        
        eCap.height(maxHeight);
      }
    }
  }

  function max(a,b){
    if(a<b) return b;
    return a;
  }
}]);
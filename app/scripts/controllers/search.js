'use strict';

app
.controller('SearchCtrl', ['$scope','$location','$routeParams', '$window','API', 'Store',
function ($scope,$location,$routeParams,$window,API,Store) {
	var spaceType = $routeParams["spaceType"];

	$scope["spaceType"] = spaceType;
	console.log(spaceType);
	$scope.stores = Store;
	$scope.stores = [];
	for (var i = 0; i < Store.length; i++) {
		if(Store[i].type == spaceType){
			$scope.stores.push(Store[i]);
		}
	};

//../../images/bg-fashion.jpg
	if(spaceType == 1){
		$scope["title"] = "ร้านเสื้อผ้า";
		$scope["imgSrc"] = "../../images/bg-fashion.jpg"
	}
	else if(spaceType == 2){
		$scope["title"] = "ร้านอาหารและเครื่องดื่ม";
		$scope["imgSrc"] = "../../images/bg-restaurant.jpg"
	}
	else if(spaceType == 3){
		$scope["title"] = "ร้านเครื่องสำอาง";
		$scope["imgSrc"] = "../../images/bg-cosmetic.jpg"
	}
	else if(spaceType == 4){
		$scope["title"] = "อื่นๆ";
		$scope["imgSrc"] = "../../images/bg-other.jpg"
	}


}]);

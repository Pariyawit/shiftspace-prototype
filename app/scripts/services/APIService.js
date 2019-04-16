"use strict";
app
.service("API",["$http", "$q",
	function ($http, $q) {
		
	// var SERVER_PATH = "http://www.shiftspace.me/api";
	var SERVER_PATH = "http://ec2-54-169-155-102.ap-southeast-1.compute.amazonaws.com";
	this.Register = function (register) {
	    var deferred = $q.defer();
	    var path = SERVER_PATH + '/spaces'
	    var request = {
			  "name": register.name,
			  "address": register.address,
			  "description": register.description,
			  "amenitie" : register.amenities,
			  "rule": register.rule,
			  "pictures": register.pictures,
			  "price": {
			    "month": register.month
			  },
			  "contact": {
			    "firstname": register.firstname,
			    "lastname": register.lastname,
			    "tel": register.tel,
			    "email": register.email
			  }
			};

	    var successHandler = function (result) {
	    	// var token = result.access_token;
	    	// localStorage.setItem("token",result.access_token);
	        deferred.resolve(result);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    console.log(request);
	    $http.post(path, request).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.Booking = function (enquiry) {
	    var deferred = $q.defer();
	    var path = SERVER_PATH + '/booking';
    	
	    var request = {
			  "id": enquiry.id,
			  "duration": {
			     "begin" : enquiry.appearDate,
			     "end" : enquiry.disappearDate
			  },
			  "product_desc": enquiry.product,
			  "offer_desc": enquiry.offer,
			  "contact": {
			    "firstname": enquiry.firstname,
			    "lastname": enquiry.lastname,
			    "tel": enquiry.tel,
			    "email": enquiry.email
			  }
			}

		console.log(request);
	    var successHandler = function (result) {
	        deferred.resolve(result);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.Search = function (type_id,keyword) {
	    var deferred = $q.defer();
	    var path = SERVER_PATH + '/space/searches';
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

	    var request = {
		    "type_id" : type_id,
		    "keyword" : keyword
	    };
	    console.log(request);
	    var successHandler = function (result) {
	    	var spaces = [];
	    	if(result.data.space){
		    	spaces = result.data.space;
		    }
	    	console.log(result);
	        deferred.resolve(spaces);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.registerOwner = function(owner){
		var deferred = $q.defer();
	    var path = SERVER_PATH + '/api/contact';
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

	    var request = {
		    "name" : owner.name,
		    "tel" : owner.tel,
		    "email" : owner.email,
		    // "password" : owner.password
	    };

	    var successHandler = function (result) {
	    	console.log(result);
	        deferred.resolve(result.data);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.addSpaceStatus = function(ownerId){
		var deferred = $q.defer();
	    var path = SERVER_PATH + '/owner/addSpaceStatus';
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

	    var request = {
		    "ownerId" : ownerId
	    };

	    var successHandler = function (result) {
	        deferred.resolve(result.data);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.addSpaceStep1 = function(ownerId, store){
		var deferred = $q.defer();
	    var path = SERVER_PATH + '/api/space/step1';
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		console.log("addSpaceStep1");
		console.log(store);
	    var request = {
		    "ownerId"	: ownerId,
			"type"	: store.type,
			"subtype"	: store.subtype,
			"subtypeOther"	: store.subtypeOther,
			"area" : parseInt(store.area),	
			// "description"	: store.description,
			"location" : {	
				"name" : store.location.name,
				"place" : store.location.place, 
				"street" : store.location.street, 
				"subdistrict" : store.location.subdistrict, 
				"district" : store.location.district, 
				"province" : store.location.province, 
				"postcode" : store.location.postcode
			},
			"gps" : {	
				"x" : parseFloat(store.gps.x),
				"y" : parseFloat(store.gps.y)
			},
			"aminity" : store.aminity,
			"aminityOther" : store.aminityOther,
			"facility" : store.facility,
			"facilityOther" : store.facilityOther
		};

	    var successHandler = function (result) {
	        deferred.resolve(result.data);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.addSpaceStep2 = function(ownerId, spaceId,store){
		var deferred = $q.defer();
	    var path = SERVER_PATH + '/api/space/step2';
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		console.log("addSpaceStep2");
		console.log(store);

	    var request = {
		    "ownerId"	: ownerId,
		    "spaceId"	: spaceId,
			"image"	: store.image,
			"store" : {	
				"detail" : store.store.description,
				"name" : store.store.name
			},
			"customer" : {		
				"traffic" : {	
					"min" : parseInt(store.customer.traffic.min),
					"max" : parseInt(store.customer.traffic.max)
				},
				"traction" : {	
					"min" : parseInt(store.customer.traction.min),
					"max" : parseInt(store.customer.traction.max)
				},
				"age" : {	
					"min" : parseInt(store.customer.age.min),
					"max" : parseInt(store.customer.age.max)
				},
				"sex" : store.customer.sex,	
				"demographic" : store.customer.demographic,
				"demographicOther" : store.customer.demographicOther,	
				"payment" : parseInt(store.customer.payment),	
			}
		};

	    var successHandler = function (result) {
	        deferred.resolve(result.data);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}


	this.addSpaceStep3 = function(ownerId, spaceId,store){
		var deferred = $q.defer();
	    var path = SERVER_PATH + '/api/space/step3';
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		console.log("Add Space Step 3");
		console.log(store);
	    var request = {
		    "ownerId"	: ownerId,
		    "spaceId"	: spaceId,
			"purposeOfSpace" : parseInt(store.purposeOfSpace),
			"purposeOfUse" : store.purposeOfUse,	
			"spaceDescription" : store.spaceDescription,
			"spaceImg" : store.spaceImg,		
			"time":	{		
				"open":{
					"start" : store.time.open.start,
					"end" : store.time.open.end
				},
				"stockIn" : {	
					"start" : store.time.stockIn.start,
					"end" : store.time.stockIn.end
				},
				"stockOut" : {	
					"start" : store.time.stockOut.start,
					"end" : store.time.stockOut.end
				}
			},
			"booking" : {
				"min" : parseInt(store.booking.min),	
				"max" : parseInt(store.booking.max)
			},
			"rule" : {		
				"rule1" : store.rule.rule1,
				"rule2" : store.rule.rule2,
				"rule3" : store.rule.rule3,
				"other" : store.rule.other
			},
			"price" : {		
				"rent" : parseInt(store.price.rent),	
				"gp" : {
					"min" : parseInt(store.price.gp.min),
					"max" : parseInt(store.price.gp.max)
				},
				"discount" : {	
					"week" : parseInt(store.price.discount.week),
					"month" : parseInt(store.price.discount.month)
				}
			}

		};

	    var successHandler = function (result) {
	        deferred.resolve(result.data);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.requestApprove = function(ownerId, spaceId,store){
		var deferred = $q.defer();
	    var path = SERVER_PATH + '/owner/requestApprove';
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}

	    var request = {
		    "ownerId"	: ownerId,
		    "spaceId"	: spaceId
		};

	    var successHandler = function (result) {
	        deferred.resolve(result.data);
	    }
	    var failureHandler = function (error) {
	        deferred.reject(error);
	    }

	    $http.post(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	this.getSpaceDetail = function(spaceId){
		var deferred = $q.defer();
		console.log(spaceId);
	    var path = SERVER_PATH + '/api/space/'+spaceId;
    	
		var config = {
			headers: {
				"Content-Type": "application/json"
			}
		}
		var request = {
		    // "ownerId"	: ownerId,
		    // "spaceId"	: spaceId
		};

	    var successHandler = function (result) {
	    	var data = result.data;
	    	var space = data;
	    	console.log(data);
	    	//to improve... map data to space before send back
	        deferred.resolve(space);
	    }
	    var failureHandler = function (error) {
	    	console.log("API error");
	        deferred.reject(error);
	    }

	    $http.get(path, request, config).then(successHandler, failureHandler);
	    return deferred.promise;
	}

	// this.Token = function(){
	// 	var deferred = $q.defer();
	// 	var path = AUTH_PATH + '/token';
	// 	var request = {
	// 		"AppId" : config.AppId, 
	// 		"AppSecret" : config.AppSecret
	// 	};
		
	// 	var successHandler = function(result) {
	// 			//Set Storage Encrypt Key - call once for 1 session
	// 			Storage.SetPassKey();
	// 			console.log(result);
	// 			var accessToken = result.data.Token.access_token;
	// 			Storage.Set("accessToken", accessToken);
	// 			var publicKey = result.data.PublicKey;
	// 			Storage.Set("publicKey", publicKey);
	// 			deferred.resolve(result);
	// 	}
	// 	var failureHandler = function(result) {
 //            // send error to controller to handle some UI
	// 	    var code = getErrorCodeFromResult(result);
	// 		deferred.reject(code);
	// 	}
		
	// 	$http.post(path, request).then(successHandler, failureHandler);
	// 	return deferred.promise;
	// }
	
	// this.AuthenticateCardAndPin = function (CardNo, Pin, Captcha) {
	//     console.log("call AuthenticateCardAndPin");
	// 	CardNo = this.Encrypt(CardNo);
	// 	Pin = this.Encrypt(Pin);
	// 	var deferred = $q.defer();
	// 	var path = SERVER_PATH + '/api/invoke/authenticate';
		
	// 	var token = Storage.Get("accessToken");
	// 	var tokenStr = "bearer " + token;
		
	// 	var config = {
	// 		headers: {
	// 			"Authorization": tokenStr
	// 		}
	// 	}
		
	

}]);
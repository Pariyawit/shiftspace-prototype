"use strict";
app
.service("Storage",[function(){
	this.Set = function(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	}
	this.Get = function(key){
		return JSON.parse(localStorage.getItem(key));
	}
	this.Clear = function(key){
		localStorage.removeItem(key);
	}
}]);
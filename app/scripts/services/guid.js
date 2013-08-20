'use strict';

angular.module('yojimboApp').factory('guid', function () {
	var service = {
		generate : function() {
		  return this._s4() + this._s4() + '-' + this._s4() + '-' + this._s4() + '-' +
		         this._s4() + '-' + this._s4() + this._s4() + this._s4();
		},
		_s4 : function() {
		  return Math.floor((1 + Math.random()) * 0x10000)
		             .toString(16)
		             .substring(1);
		}
	}
	return service;
});
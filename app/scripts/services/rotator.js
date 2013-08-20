'use strict';

angular.module('yojimboApp').factory('rotator', function () {
	var service = {
		rotationIncrement : 90,
		left : function(deg) {
			return this._normalizeRotation(this._defaultDeg(deg) - this.rotationIncrement);
		},
		right : function(deg) {
			return this._normalizeRotation(this._defaultDeg(deg) + this.rotationIncrement);
		},
		_normalizeRotation : function(deg) {
			if(deg < 0) {
                return normalizeRotation(deg + 360);
            } else if(deg > 360) {
                return normalizeRotation(deg - 360);
            } else {
                return deg;
            }
        },
        _defaultDeg : function(deg){
        	if(typeof deg == 'undefined') {
				return 0;
			} else {
				return deg;
			}
        }
	}
	return service;
});
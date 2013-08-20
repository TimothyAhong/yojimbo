'use strict';

angular.module('yojimboApp').factory('draggerFactory', function ($rootScope, $document, safeApply) {
	var factory = {
		create: function() {
			var service = {
				options: {},
				setOptions: function(options) {
					this.options = options;
				},
				enable: function(element, item) {
					this.element = element;
					this.item = item;
					//TODO this logic may be wrong
					this.startX = this._determineStartValue(item, 'x');
					this.startY = this._determineStartValue(item, 'y');
	                
	               	this._setItemPosition(this.startX, this.startY);
	                this._bindMouseDownEvent();
				},
				_bindMouseDownEvent: function() {
					var _this = this;

					var mousemove = function(event) {
						var y = event.screenY - _this.startY;
		                var x = event.screenX - _this.startX;
		                
		                //restrict sizes
		                if(typeof _this.options.maxX != 'undefined' && x > _this.options.maxX) {
		                    x = _this.options.maxX;
		                }
		                if(typeof _this.options.maxY != 'undefined' && y > _this.options.maxY) {
		                    y = _this.options.maxY;
		                }
		                if(typeof _this.options.minX != 'undefined' && x < _this.options.minX) {
		                    x = _this.options.minX;
		                }
		                if(typeof _this.options.minY != 'undefined' && y < _this.options.minY) {
		                    y = _this.options.minY;
		                }

		                _this._setItemPosition(x, y);
					}

					var mouseup = function() {
						$document.unbind('mousemove', mousemove);
                		$document.unbind('mouseup', mouseup);
					}

					this.element.on('mousedown', function(event) {
	                    _this.startX = event.screenX - _this.item.x;
	                    _this.startY = event.screenY - _this.item.y;
	                    $document.on('mousemove', mousemove);
	                    $document.on('mouseup', mouseup);
	                });
				},
				_determineStartValue: function(item, property) {
					if(typeof item[property] != 'undefined') {
						return item[property];
					} else {
						return this._defaultValue();
					}
				},
				_defaultValue: function() {
					return 0;
				},
				_setItemPosition: function(x, y) {
					var _this = this;
					safeApply($rootScope, function(){
						_this.item.x = x;
						_this.item.y = y;
					});	
				}
			};
			return service;
		}
	}
	return factory;
});
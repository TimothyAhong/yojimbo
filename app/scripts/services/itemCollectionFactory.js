'use strict';

angular.module('yojimboApp').factory('itemCollectionFactory', function (collectionTransferService, shuffler, guid) {
	var factory = {
		create : function() {
			var service = {
				items : [],
				name : '',
				subscribedCallback : function(){},
				getFirst : function() {
					if(this.items.length > 0) {
						return this.items[0];
					} else {
						return false;
					}
				},
				subscribeToItemChanges : function(callback) {
					//this function is called on add, delete and shuffle operations
					//can be used to sync the data across multiple clients or to enable notifications
					this.subscribedCallback = callback;
				},
				getName : function() {
					return this.name;
				},
				addBulk : function(items) {
					var _this = this;
					angular.forEach(items, function(item) {
						_this.add(item);
					});
				},
				add : function(item) {
					this._formatItemBeforeInsert(item);
					this.items.push(item); 
					this.subscribedCallback('add', item, this.items);
				},
				remove : function(item) {
					var newArray = [];
					var index = this.items.indexOf(item)
  					this.items.splice(index,1);
  					/*
					angular.forEach(this.items, function(listItem, i) {
						if(listItem.collectionUniqueId != item.collectionUniqueId) {
							newArray.push(listItem);
						}
					});
					angular.copy(newArray, this.items);
					*/
					this.subscribedCallback('remove', item, this.items);
				},
				setName : function(name) {
					this.name = name;
					//register this collection with the collection transfer service
					collectionTransferService.registerName(name, this);
				},
				shuffle : function() {
					this.items = shuffler.shuffle(this.items);
					this.subscribedCallback('shuffle', this.items);
				},
				_formatItemBeforeInsert: function(item) {
					item.collectionName = this.name;
					item.collectionUniqueId = guid.generate();
				}
			};
			return service;
		}
	};
	return factory;
});
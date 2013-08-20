'use strict';

angular.module('yojimboApp').factory('collectionTransferService', function () {
	var service = {
		itemCollections : {},
		registerName : function(name, itemCollection) {
			if(this._isNameUnique(name)) {
				this.itemCollections[name] = itemCollection;
			} else {
				//TODO error in development mode
			}
		},
		transferItemToCollection : function(item, targetName) {
			var fromCollection = this._getCollectionByItem(item);
			console.log(fromCollection);
			fromCollection.remove(item);
			var toCollection = this._getCollectionByName(targetName);
			console.log(toCollection);
			toCollection.add(item);
			//TODO messaging?
		},
		addItemToCollection : function(item, targetName) {
			var collection  = this._getCollectionByName(targetName);
			collection.add(item);
		},
		removeItemFromCollection : function(item, targetName) {
			var collection  = this._getCollectionByName(targetName);
			collection.remove(item);
		},
		_isNameUnique : function(name) {
			angular.forEach(this.itemCollections, function(itemCollection, collectionName) {
				if(collectionName === name) {
					return false;
				}
			});
			return true;
		},
		_getCollectionByName : function(name) {
			return this.itemCollections[name];
		},
		_getCollectionByItem : function(item) {
			return this._getCollectionByName(item.collectionName);
		}
	}
	//there can be only 1 collection transfer service
	return service;
});
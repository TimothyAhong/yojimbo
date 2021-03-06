'use strict';

angular.module('yojimboApp').directive('yojDeck', function(collectionTransferService){
    return {
        restrict: 'A',
        scope: {
            yojItemCollection: '=',    //collection of items
            yojItemDisplayClass: '=',   //display setting, which class of the top item do we display??
            yojItemSettings: '=',   //settings for the item
            yojDeckSettings: '='   //settings for the item
        },
        link: function($scope){
            $scope.$watch('yojItemCollection', function(newValue) {
                if (newValue) {
                    $scope.firstItem = newValue.getFirst();
                    $scope.collectionName = newValue.getName();
                }
            }, true);
        },
        controller: function($scope) {
            $scope.drawToCollection = function(targetName) {
                collectionTransferService.transferItemToCollection($scope.firstItem, targetName);
            };
            $scope.shuffle = function() { 
                $scope.yojItemCollection.shuffle(); 
            };
        },
        templateUrl : 'scripts/directives/deck.html',
        replace : true
    }
});
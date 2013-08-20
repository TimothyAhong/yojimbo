'use strict';

angular.module('yojimboApp').directive('yojPile', function(collectionTransferService){
    return {
        restrict: 'A',
        scope: {
            yojItemCollection: '=',     //collection of items
            yojItemSettings: '=',       //settings that get applied to each item
            yojItemDisplayClass: '='    //which class do we display for this item
        },
        link: function($scope){
            $scope.$watch('yojItemCollection', function(newValue) {
                if (newValue) {
                    $scope.yojItemCollection = newValue;
                }
            }, true);
        },
        controller: function($scope) {
        $scope.items = $scope.yojItemCollection.items;
        },
        templateUrl : 'scripts/directives/pile.html',
        replace : false
    }
});
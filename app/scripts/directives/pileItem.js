'use strict';

angular.module('yojimboApp').directive('yojPileItem', function($document, collectionTransferService, rotator, draggerFactory){
    return {
        restrict: 'A',
        scope: {
            yojItem: '=',           //collection of items
            yojItemSettings: '=',       //settings that get applied to each item
            yojDisplayClass: '@',    //which class to display as default
        },
        link: function($scope, element, attrs){
            //TODO put this in the item settings
            $scope.yojItemDisplayClass = attrs.yojItemDisplay;

            //TODO is this needed?
            $scope.$watch('yojItem', function(newValue) {
                if (newValue) {
                    $scope.item = newValue;
                    //if this item is not draggable then we have to unset the position
                    if(!$scope.yojItemSettings.draggable) {
                        $scope.yojItem.x = null;
                        $scope.yojItem.y = null;
                    }
                }
            }, true);
            
            if($scope.yojItemSettings.draggable) {
                var options = {
                    maxX : $scope.yojItemSettings.yojMaxX,
                    minX : $scope.yojItemSettings.yojMinX,
                    maxY : $scope.yojItemSettings.yojMaxY,
                    minY : $scope.yojItemSettings.yojMinY
                }
                var dragger = draggerFactory.create();
                dragger.setOptions(options);
                dragger.enable(element, $scope.yojItem);
            }

        },
        controller: function($scope) {
            $scope.moveToCollection = function(targetName) {
                collectionTransferService.transferItemToCollection($scope.yojItem, targetName);
            }
            $scope.itemClass = function(){
                return $scope.yojItem.displayClasses[$scope.yojDisplayClass];
            }

            //TODO move to service
            var adjustZindex = function(delta) {
                if(typeof $scope.yojItem.z == 'undefined') {
                    $scope.yojItem.z = 0;
                }
                $scope.yojItem.z += delta;
            }
            $scope.moveUp = function() {
                adjustZindex(1);
            }
            $scope.moveDown = function() {
                adjustZindex(-1);
            }

            $scope.changeDisplayClass = function(displayClass) {
                $scope.yojDisplayClass = displayClass;
            }

            $scope.rotateLeft = function() {
                $scope.rotation = rotator.left($scope.rotation);
                console.log($scope.rotation);
            }
            $scope.rotateRight = function() {
                $scope.rotation = rotator.right($scope.rotation);
                console.log($scope.rotation);
            }

            //TODO move to service
            var determineRotationClass = function(rotation) {
                return 'yoj-rot-' + rotation;
            }
            $scope.additionalClasses = function() {
                var str = [];
                if($scope.yojItemSettings.draggable) {
                    str.push('yoj-draggable');
                }

                if($scope.yojItemSettings.rotatable) {
                    str.push('yoj-rotatable');
                    str.push(determineRotationClass($scope.rotation));
                }

                return str.join(' ');
            }
        },
        templateUrl : 'scripts/directives/pileItem.html',
        replace : true
    }
});
      
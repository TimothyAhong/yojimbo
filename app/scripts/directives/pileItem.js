'use strict';

angular.module('yojimboApp').directive('yojPileItem', function($document, collectionTransferService){
    return {
        restrict: 'A',
        scope: {
            yojItem: '=',           //collection of items
            yojItemSettings: '=',       //settings that get applied to each item
            yojDisplayClass: '@',    //which class to display as default
        },
        link: function($scope, element, attrs){
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

            //TODO move this to a service
            function mousemove(event) {
                y = event.screenY - startY;
                x = event.screenX - startX;
                
                //restrict sizes
                if($scope.yojItemSettings.yojMaxX && x > $scope.yojItemSettings.yojMaxX) {
                    x = yojMaxX;
                }
                if($scope.yojItemSettings.yojMaxY && y > $scope.yojItemSettings.yojMaxY) {
                    y = yojMaxY;
                }
                if($scope.yojItemSettings.yojMinX && x < $scope.yojItemSettings.yojMinX) {
                    x = yojMinX;
                }
                if($scope.yojItemSettings.yojMinY && y < $scope.yojItemSettings.yojMinY) {
                    y = yojMaxY;
                }

                $scope.$apply( function() {
                    $scope.yojItem.y = y;
                    $scope.yojItem.x = x;
                });
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
            
            if($scope.yojItemSettings.draggable) {
                //TODO move to service
                var x=0, y=0, startX=0, startY=0;
                $scope.yojItem.x = startX;
                $scope.yojItem.y = startY;
                $scope.yojItem.z = 0;
                
                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    //event.preventDefault();
                    startX = event.screenX - x;
                    startY = event.screenY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });
            }

        },
        controller: function($scope) {
            $scope.moveToCollection = function(targetName) {
                collectionTransferService.transferItemToCollection($scope.yojItem, targetName);
            }
            $scope.itemClass = function(){
                return $scope.yojItem.displayClasses[$scope.yojDisplayClass];
            }
            $scope.moveUp = function() {
                $scope.yojItem.z += 1;
            }
            $scope.moveDown = function() {
                $scope.yojItem.z -= 1;
            }
            $scope.changeDisplayClass = function(displayClass) {
                $scope.yojDisplayClass = displayClass;
            }

            //TODO move to service
            $scope.rotation = 0;
            var normalizeRotation = function(deg) {
                if(deg < 0) {
                    return normalizeRotation(deg + 360);
                } else if(deg > 360) {
                    return normalizeRotation(deg - 360);
                } else {
                    return deg;
                }
            }
            $scope.rotateLeft = function() {
                $scope.rotation = normalizeRotation($scope.rotation - 90)
            }
            $scope.rotateRight = function() {
                $scope.rotation = normalizeRotation($scope.rotation + 90)
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
      
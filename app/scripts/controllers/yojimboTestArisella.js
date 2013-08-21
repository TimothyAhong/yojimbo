'use strict';
angular.module('yojimboTest', ['yojimboApp']);

angular.module('yojimboTest').controller('yojimboTestArisellaCtrl', function ($scope, itemCollectionFactory) {
    
    $scope.itemSettings = {
        displayClassButtons: [
            {title: 'flip down', displayClass: 'back' },
            {title: 'flip up', displayClass: 'front' },
        ],
        displayMoveUpButton : true,
        displayMoveDownButton : true,
        displayMoveToCollectionButton : true,
        availableCollections : ['board','deck','hand','extras','graveyard','eventDeck'],
        draggable : true,
        rotatable : true
    }

    $scope.deckItemSettings = {
        displayMoveToCollectionButton : true,
        availableCollections : ['board','deck','hand','extras','graveyard','eventDeck'],
    }

    $scope.deckSettings = {
        displayNumberOfItems : true,
        canShuffle : true
    }

    //setup the collections
    //main board area
    $scope.board = itemCollectionFactory.create();
    $scope.board.setName('board');
    //deck
    $scope.deck = itemCollectionFactory.create();
    $scope.deck.setName('deck');
    //graveyard
    $scope.graveyard = itemCollectionFactory.create();
    $scope.graveyard.setName('graveyard');
    //private hand
    $scope.hand = itemCollectionFactory.create();
    $scope.hand.setName('hand');
    //bosses
    $scope.hero = itemCollectionFactory.create();
    $scope.hero.setName('hero');
    //general tray
    $scope.extras = itemCollectionFactory.create();
    $scope.extras.setName('extras');

    //factory to create cards with similar settings
    var regularCardFactory = {
        create : function(cardClassName) {
            var card = {
                displayClasses : {
                    front : 'wowtcg-card ' + cardClassName,
                    back : 'wowtcg-card wowtcg-back'
                }
            }
            return card;
        }
    }

    var deckCards = [
        'wowtcg-keeper-sharus',
        'wowtcg-keeper-sharus',
        'wowtcg-keeper-sharus',
        'wowtcg-keeper-sharus',
        'wowtcg-keeper-balos',
        'wowtcg-keeper-balos',
        'wowtcg-keeper-balos',
        'wowtcg-keeper-balos',
        'wowtcg-remulos-son-of-cenarius',
        'wowtcg-remulos-son-of-cenarius',
        'wowtcg-remulos-son-of-cenarius',
        'wowtcg-remulos-son-of-cenarius',
        'wowtcg-stonebranch-ancient-of-war',
        'wowtcg-stonebranch-ancient-of-war',
        'wowtcg-stonebranch-ancient-of-war',
        'wowtcg-stonebranch-ancient-of-war',
        'wowtcg-shadow-of-aran',
        'wowtcg-shadow-of-aran',
        'wowtcg-shadow-of-aran',
        'wowtcg-shadow-of-aran',
        'wowtcg-doom-commander-zaakuul',
        'wowtcg-doom-commander-zaakuul',
        'wowtcg-doom-commander-zaakuul',
        'wowtcg-doom-commander-zaakuul',
        'wowtcg-muln-earthfury',
        'wowtcg-muln-earthfury',
        'wowtcg-muln-earthfury',
        'wowtcg-muln-earthfury',
        'wowtcg-commander-ulthok',
        'wowtcg-commander-ulthok',
        'wowtcg-commander-ulthok',
        'wowtcg-commander-ulthok',
        'wowtcg-mark-of-the-ancients',
        'wowtcg-mark-of-the-ancients',
        'wowtcg-mark-of-the-ancients',
        'wowtcg-mark-of-the-ancients',
        'wowtcg-neferset-runecaster',
        'wowtcg-neferset-runecaster',
        'wowtcg-neferset-runecaster',
        'wowtcg-keeper-alinar',
        'wowtcg-keeper-alinar',
        'wowtcg-keeper-alinar',
        'wowtcg-wild-wrath',
        'wowtcg-wild-wrath',
        'wowtcg-wild-wrath',
        'wowtcg-shadowfang-keep',
        'wowtcg-shadowfang-keep',
        'wowtcg-shadowfang-keep',
        'wowtcg-bottled-life',
        'wowtcg-bottled-life',
        'wowtcg-bottled-life',
        'wowtcg-the-essence-of-enmity',
        'wowtcg-the-essence-of-enmity',
        'wowtcg-the-essence-of-enmity',
        'wowtcg-seeds-of-their-demise',
        'wowtcg-seeds-of-their-demise',
        'wowtcg-seeds-of-their-demise',
        'wowtcg-azgalor-the-pit-lord',
        'wowtcg-azgalor-the-pit-lord'
    ];
    angular.forEach(deckCards, function(cardClass) {
        $scope.deck.add(regularCardFactory.create(cardClass));
    });

    $scope.hero.add({
        displayClasses : { front : 'wowtcg-card wowtcg-arisella-front', back : 'wowtcg-card wowtcg-arisella-back' }
    });

    //setup tabs
    $scope.tabs = ['board','extras','hand'];
    $scope.tabs.index = 1;
    $scope.tabs.active = function(){
        return $scope.tabs[$scope.tabs.index];
    }
    $scope.isActive = function(index, i) {
        if(index == i) {
            return "active";
        }
    }
});









'use strict';
angular.module('yojimboTest', ['yojimboApp']);

angular.module('yojimboTest').controller('yojimboTestCtrl', function ($scope, itemCollectionFactory) {
    
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
    $scope.bosses = itemCollectionFactory.create();
    $scope.bosses.setName('bosses');
    //channelers
    $scope.channelers = itemCollectionFactory.create();
    $scope.channelers.setName('channelers');
    //manticrons
    $scope.manticrons = itemCollectionFactory.create();
    $scope.manticrons.setName('manticrons');
    //lair
    $scope.lair = itemCollectionFactory.create();
    $scope.lair.setName('lair');
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

    var abilityCards = [
        'wowtcg-abyssal-reinforcements',
        'wowtcg-bathe-in-blood',
        'wowtcg-blast-nova',
        'wowtcg-blindside',
        'wowtcg-blood-siphon',
        'wowtcg-broken-hopes',
        'wowtcg-brush-aside',
        'wowtcg-cleave-apart',
        'wowtcg-deadly-sweep',
        'wowtcg-demonic-fury',
        'wowtcg-fel-ruination',
        'wowtcg-fiery-pits',
        'wowtcg-magtheridons-rage',
        'wowtcg-mind-exhaustion',
        'wowtcg-one-fell-swoop',
        'wowtcg-path-of-ruin',
        'wowtcg-power-returns',
        'wowtcg-rampant-destruction',
        'wowtcg-redouble-effort',
        'wowtcg-sadistic-choice',
        'wowtcg-sow-destruction',
        'wowtcg-spirit-wrench',
        'wowtcg-squish-together',
        'wowtcg-swath-of-destruction',
        'wowtcg-terrifying-presence',
        'wowtcg-toss-about',
        'wowtcg-trample-underfoot',
        'wowtcg-violent-reflex',
        'wowtcg-whiplash',
        'wowtcg-will-of-the-legion',
        'wowtcg-pit-lords-armor'
    ];
    angular.forEach(abilityCards, function(cardClass) {
        //add 2 of each ability
        $scope.deck.add(regularCardFactory.create(cardClass));
        $scope.deck.add(regularCardFactory.create(cardClass));
    });
    //deck has 3 glaives
    var pitLordsGlaive = 'wowtcg-pit-lords-glaive';
    $scope.deck.add(regularCardFactory.create(pitLordsGlaive));
    $scope.deck.add(regularCardFactory.create(pitLordsGlaive));
    $scope.deck.add(regularCardFactory.create(pitLordsGlaive));

    //add channelers
    $scope.channelers.add(regularCardFactory.create('wowtcg-dark-mending-channeler'));
    $scope.channelers.add(regularCardFactory.create('wowtcg-shadow-channeler'));
    $scope.channelers.add(regularCardFactory.create('wowtcg-shadow-channeler2'));
    $scope.channelers.add(regularCardFactory.create('wowtcg-summoner-channeler'));
    $scope.channelers.add(regularCardFactory.create('wowtcg-summoner-channeler2'));

    //add manticrons
    $scope.manticrons.add(regularCardFactory.create('wowtcg-manticron-cube'));
    $scope.manticrons.add(regularCardFactory.create('wowtcg-manticron-cube'));
    $scope.manticrons.add(regularCardFactory.create('wowtcg-manticron-cube'));
    $scope.manticrons.add(regularCardFactory.create('wowtcg-manticron-cube'));
    $scope.manticrons.add(regularCardFactory.create('wowtcg-manticron-cube'));

    //add lair
    $scope.lair.add({
        displayClasses : { front : 'wowtcg-card wowtcg-magtheridons-lair-front', back : 'wowtcg-card wowtcg-magtheridons-lair-back' }
    });

    //add magtheridons 
    $scope.bosses.add({
        displayClasses : { front : 'wowtcg-card wowtcg-magtheridon-chained-front', back : 'wowtcg-card wowtcg-magtheridon-chained-back' }
    });

    $scope.bosses.add({
        displayClasses : { front : 'wowtcg-card wowtcg-magtheridon-unchained-front', back : 'wowtcg-card wowtcg-magtheridon-unchained-back' }
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









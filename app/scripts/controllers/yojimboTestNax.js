'use strict';
angular.module('yojimboTest', ['yojimboApp']);

angular.module('yojimboTest').controller('yojimboTestCtrl', function ($scope, itemCollectionFactory) {
    

    //TODO for some reason the extras collection is not removing items correctly... will have to investigate
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

    $scope.counterItemSettings = {
        inputs : [
            {displayValueOnItem: true, displayValueOnItemClass: 'counter-number', modelProperty: 'value'}
        ],
        displayMoveToCollectionButton : true,
        displayMoveUpButton : true,
        displayMoveDownButton : true,
        draggable : true,
        availableCollections : ['boardCounters','graveyard']
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
    //eventDeck
    $scope.eventDeck = itemCollectionFactory.create();
    $scope.eventDeck.setName('eventDeck');
    //graveyard
    $scope.graveyard = itemCollectionFactory.create();
    $scope.graveyard.setName('graveyard');
    //private hand
    $scope.hand = itemCollectionFactory.create();
    $scope.hand.setName('hand');
    //whelps
    $scope.whelps = itemCollectionFactory.create();
    $scope.whelps.setName('whelps');
    //onyxias
    $scope.onyxiaStages = itemCollectionFactory.create();
    $scope.onyxiaStages.setName('onyxiaStages');
    //counters
    $scope.counters = itemCollectionFactory.create();
    $scope.counters.setName('counters');
    //counters on the board
    $scope.boardCounters = itemCollectionFactory.create();
    $scope.boardCounters.setName('boardCounters');

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
        'wowtcg-another-lesson',
        'wowtcg-bellowing-roar',
        'wowtcg-brood-of-onyxia',
        'wowtcg-burninate',
        'wowtcg-crush',
        'wowtcg-deep-breath',
        'wowtcg-devour',
        'wowtcg-draconic-might',
        'wowtcg-draconic-rage',
        'wowtcg-dragon-hide',
        'wowtcg-engulfing-flames',
        'wowtcg-flame-breath',
        'wowtcg-foolish-mortals',
        'wowtcg-head-slam',
        'wowtcg-home-lair-advantage',
        'wowtcg-how-fortuitous',
        'wowtcg-knock-away',
        'wowtcg-lava-cracks',
        'wowtcg-learn-your-place-mortal',
        'wowtcg-meaningless-exertion',
        'wowtcg-roasted-flesh',
        'wowtcg-shattering-scales',
        'wowtcg-tail-swipe',
        'wowtcg-thrash',
        'wowtcg-tooth-and-claw',
        'wowtcg-tossed-into-the-hatchery',
        'wowtcg-trample',
        'wowtcg-the-whelp-pits',
        'wowtcg-wing-buffet',
        'wowtcg-wrath-of-onyxia'
    ];
    angular.forEach(abilityCards, function(cardClass) {
        //add 2 of each ability
        $scope.deck.add(regularCardFactory.create(cardClass));
        $scope.deck.add(regularCardFactory.create(cardClass));
    });

    var eventCards = [
        'wowtcg-battle-plan',
        'wowtcg-blunder-into-the-eggs',
        'wowtcg-break-in-the-action',
        'wowtcg-broken-ranks',
        'wowtcg-burn-to-a-crisp',
        'wowtcg-charred-bones',
        'wowtcg-chink-in-her-armor',
        'wowtcg-claw-claw-bite',
        'wowtcg-down-the-gullet',
        'wowtcg-dragonslayers',
        'wowtcg-feeding-time',
        'wowtcg-fickle-fate',
        'wowtcg-fuel-for-the-fire',
        'wowtcg-growing-rage',
        'wowtcg-he-who-hesitates',
        'wowtcg-hidden-reserves',
        'wowtcg-the-high-cost-of-dragonslaying',
        'wowtcg-imposing-presence',
        'wowtcg-lead-from-the-front',
        'wowtcg-lesser-of-two-evils',
        'wowtcg-play-with-your-food',
        'wowtcg-quicken-the-pace',
        'wowtcg-reign-of-fire',
        'wowtcg-sacrificial-meal',
        'wowtcg-searing-flames',
        'wowtcg-second-wind',
        'wowtcg-seize-the-moment',
        'wowtcg-smoke-and-ash',
        'wowtcg-take-cover',
        'wowtcg-wing-storm'
    ];
    angular.forEach(eventCards, function(cardClass) {
        //add 1 of each event
        $scope.eventDeck.add(regularCardFactory.create(cardClass));
    });

    //add 20 whelps to the additional items
    for(var i = 0; i < 20; i++) {
        $scope.whelps.add({
            displayClasses : { front : 'wowtcg-half-card wowtcg-onyxian-whelp', back : 'wowtcg-half-card wowtcg-back' }
        });
    }

    //add each of onyxias forms 
    $scope.onyxiaStages.add({
        displayClasses : { front : 'wowtcg-card wowtcg-onyxia-stage-1-front', back : 'wowtcg-card wowtcg-onyxia-stage-1-back' }
    });

    $scope.onyxiaStages.add({
        displayClasses : { front : 'wowtcg-card wowtcg-onyxia-stage-2-front', back : 'wowtcg-card wowtcg-onyxia-stage-2-back' }
    });

    $scope.onyxiaStages.add({
        displayClasses : { front : 'wowtcg-card wowtcg-onyxia-stage-3-front', back : 'wowtcg-card wowtcg-onyxia-stage-3-back' }
    });

    //add the counters
    //add 20 whelps to the additional items
    for(var i = 0; i < 20; i++) {
        $scope.counters.add({
            displayClasses : { red : 'fish red', green : 'fish green' }
        });
    }

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









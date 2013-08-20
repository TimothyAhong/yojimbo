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
    //kEventDeck
    $scope.kEventDeck = itemCollectionFactory.create();
    $scope.kEventDeck.setName('kEventDeck');
    //graveyard
    $scope.graveyard = itemCollectionFactory.create();
    $scope.graveyard.setName('graveyard');
    //private hand
    $scope.hand = itemCollectionFactory.create();
    $scope.hand.setName('hand');

    //quarters
    $scope.quarterDeck = itemCollectionFactory.create();
    $scope.quarterDeck.setName('quarterDeck');
    //bosses
    $scope.bosses = itemCollectionFactory.create();
    $scope.bosses.setName('bosses');

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
        'wowtcg-assembled_masses',
        'wowtcg-broodmothers_rage',
        'wowtcg-the_cats_meow',
        'wowtcg-the_chill_of_undeath',
        'wowtcg-debacle',
        'wowtcg-debilitating_nausea',
        'wowtcg-fortituous_gift',
        'wowtcg-frigid_hopelessness',
        'wowtcg-a_grave_bargain',
        'wowtcg-hastened_preparation',
        'wowtcg-icecold_refreshment',
        'wowtcg-inevitable_failure',
        'wowtcg-premature_departure',
        'wowtcg-punish_the_greedy',
        'wowtcg-ruthless_precision',
        'wowtcg-shadow_of_obliteration',
        'wowtcg-shadowy_intrusion',
        'wowtcg-tempt_your_fate',
        'wowtcg-timely_respite',
        'wowtcg-unholy_mending'
    ];
    angular.forEach(eventCards, function(cardClass) {
        //add 1 of each event
        $scope.eventDeck.add(regularCardFactory.create(cardClass));
    });

    var kEventCards = [
        'wowtcg-kelthuzads_blast',
        'wowtcg-kelthuzads_detonation',
        'wowtcg-kelthuzads_fissure',
        'wowtcg-kelthuzads_guardians',
        'wowtcg-kelthuzads_volley'
    ];
    angular.forEach(kEventCards, function(cardClass) {
        //add 1 of each event
        $scope.kEventDeck.add(regularCardFactory.create(cardClass));
    });



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









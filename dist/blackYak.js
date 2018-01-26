/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_hearts_hearts__ = __webpack_require__(1);

var deck = new __WEBPACK_IMPORTED_MODULE_0__node_modules_hearts_hearts__["a" /* Deck */](1);
var hand = deck.draw(2);
function speak(msg) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
}
function readCardHand(hand) {
    var msg = 'You have a';
    var i = 1;
    hand.map(function (card) {
        msg += card.cardString;
        msg += i < hand.length ? (i === hand.length - 1 ? 'and a ' : ' a ') : '';
        i++;
    });
    return msg;
}
var commands = {
    '(could)(may)(you)(please)(dealer) tell me my hand (*word)': function () {
        speak(readCardHand(hand));
    },
    '(could)(please)(may)(you)(please)(dealer) hit me (*word)': function (word) {
        var card = deck.draw(1);
        console.log(word);
        hand.push.apply(hand, card);
        speak(readCardHand(hand));
    },
    'thank you (*word)': function () {
        speak('You\'re welcome');
    },
    'thanks (*word)': function () {
        speak('no problem');
    }
};
// Add our commands to annyang
window.annyang.addCommands(commands);
window.annyang.start();
window.annyang.addCallback('end', function () {
    console.log('end');
    window.annyang.start();
});
window.annyang.addCallback('error', function () {
    console.log('There was an error in Annyang!');
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Deck; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card_card__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant_deck_constant__ = __webpack_require__(3);


var Deck = /** @class */ (function () {
    function Deck(numberOfDecks, numOfJokers) {
        if (numberOfDecks === void 0) { numberOfDecks = 1; }
        if (numOfJokers === void 0) { numOfJokers = 0; }
        this.decks = this.createDecks(numberOfDecks, numOfJokers);
        this.shuffle();
    }
    Object.defineProperty(Deck.prototype, "cards", {
        get: function () {
            return this.decks;
        },
        enumerable: true,
        configurable: true
    });
    Deck.prototype.draw = function (numberOfCards, from) {
        if (numberOfCards === void 0) { numberOfCards = 1; }
        if (from === void 0) { from = 'top'; }
        if (numberOfCards < 1 || numberOfCards > this.decks.length) {
            console.error();
            return;
        }
        var cards = [];
        for (var i = 0; i < numberOfCards; i++) {
            if (from === 'top') {
                cards.push(this.decks.pop());
            }
            else if (from === 'bottom') {
                cards.push(this.decks.shift());
            }
            else {
                var randomCardIndex = Math.floor(Math.random() * this.decks.length);
                cards.push(this.decks.splice(randomCardIndex, 1)[0]);
            }
        }
        return cards;
    };
    //Look at cards
    Deck.prototype.inspect = function (numberOfCards, from) {
        if (numberOfCards === void 0) { numberOfCards = 1; }
        if (from === void 0) { from = 'top'; }
        if (numberOfCards < 1 || numberOfCards > this.decks.length) {
            console.error();
            return;
        }
        var cards = [];
        var copyOfDeck = this.decks.slice();
        for (var i = 0; i < numberOfCards; i++) {
            if (from === 'top') {
                cards.push(this.decks[i]);
            }
            else if (from === 'bottom') {
                cards.push(this.decks[this.decks.length - 1]);
            }
            else {
                var randomCardIndex = Math.floor(Math.random() * this.decks.length);
                cards.push(copyOfDeck.splice(randomCardIndex, 1)[0]);
            }
        }
        return cards;
    };
    Deck.prototype.createDecks = function (numberOfDecks, numJoker) {
        if (numberOfDecks === void 0) { numberOfDecks = 1; }
        if (numJoker === void 0) { numJoker = 0; }
        var decks = [];
        if (numberOfDecks < 1 || numberOfDecks > 100) {
            console.error();
            return;
        }
        for (var i = 0; i < numberOfDecks; i++) {
            decks = decks.concat(this.buildDeck(numJoker));
        }
        return decks;
    };
    Deck.prototype.shuffle = function () {
        var copy = [], index;
        while (this.decks.length > 0) {
            index = Math.floor(Math.random() * this.decks.length);
            copy.push(this.decks.splice(index, 1)[0]);
        }
        (_a = this.decks).push.apply(_a, copy);
        return this.decks;
        var _a;
    };
    Deck.prototype.buildDeck = function (numJoker) {
        var deck = [];
        for (var _i = 0, SUITS_1 = __WEBPACK_IMPORTED_MODULE_1__constant_deck_constant__["c" /* SUITS */]; _i < SUITS_1.length; _i++) {
            var suit = SUITS_1[_i];
            for (var _a = 0, CARD_TYPES_1 = __WEBPACK_IMPORTED_MODULE_1__constant_deck_constant__["a" /* CARD_TYPES */]; _a < CARD_TYPES_1.length; _a++) {
                var cardType = CARD_TYPES_1[_a];
                deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_card__["a" /* Card */](suit, cardType));
            }
        }
        for (var i = 0; i < numJoker; i++) {
            deck.push(new __WEBPACK_IMPORTED_MODULE_0__card_card__["a" /* Card */](__WEBPACK_IMPORTED_MODULE_1__constant_deck_constant__["b" /* JOKER */].suit, __WEBPACK_IMPORTED_MODULE_1__constant_deck_constant__["b" /* JOKER */].cardType));
        }
        return deck;
    };
    return Deck;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
var Card = /** @class */ (function () {
    function Card(suit, cardType) {
        this.cardSuit = suit;
        this.cardType = cardType;
    }
    Object.defineProperty(Card.prototype, "suit", {
        //suit getters
        get: function () {
            return this.cardSuit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "suitName", {
        get: function () {
            return this.cardSuit.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "suitKey", {
        get: function () {
            return this.cardSuit.key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "type", {
        //cardType getters
        get: function () {
            return this.cardType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "cardTypeName", {
        get: function () {
            return this.cardType.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "typeValue", {
        get: function () {
            return this.cardType.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "typeSymbol", {
        get: function () {
            return this.cardType.symbol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "face", {
        //get combined card info
        get: function () {
            return this.cardType.symbol + this.cardSuit.key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "cardString", {
        get: function () {
            return this.cardType.name + ' of ' + this.cardSuit.name + 's';
        },
        enumerable: true,
        configurable: true
    });
    return Card;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SUITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CARD_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JOKER; });
var SUITS = [
    { key: 'd', name: 'diamond' },
    { key: 's', name: 'spade' },
    { key: 'h', name: 'heart' },
    { key: 'c', name: 'club' }
];
var CARD_TYPES = [
    { symbol: 'A', name: "ace", value: 1 },
    { symbol: '2', name: "two", value: 2 },
    { symbol: '3', name: "three", value: 3 },
    { symbol: '4', name: "four", value: 4 },
    { symbol: '5', name: "five", value: 5 },
    { symbol: '6', name: "six", value: 6 },
    { symbol: '7', name: "seven", value: 7 },
    { symbol: '8', name: "eight", value: 8 },
    { symbol: '9', name: "nine", value: 9 },
    { symbol: '10', name: "ten", value: 10 },
    { symbol: 'J', name: "jack", value: 11 },
    { symbol: 'Q', name: "queen", value: 12 },
    { symbol: 'K', name: "king", value: 13 }
];
var JOKER = { cardType: { symbol: 'JK', name: 'joker', value: 14 },
    suit: { key: null, name: null } };


/***/ })
/******/ ]);
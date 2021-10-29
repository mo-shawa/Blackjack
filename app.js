//CONSTANTS
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"];

//CACHED ELEMENTS
const pHandEl = document.querySelector(".pHand");
const dHandEl = document.querySelector(".dHand");
const deckEl = document.querySelector(".deck");
//buttons
const hitBtn = document.querySelector(".hit");
const stayBtn = document.querySelector(".stay");
const dealBtn = document.querySelector(".deal");
const shuffleBtn = document.querySelector(".shuffle");

//STATE VARIABLES
let deck = [];
let pHand = [];
let pHandVal = 0;
let dHand = [];
let dHandVal = 0;
let won = false;

//FUNCTIONS
function init() {
	makeDeck();
	shuffle();
	pHand = [];
	pHandVal = 0;
	dHand = [];
	dHandVal = 0;
	won = false;
}

//Create a deck

function makeDeck(deck) {
	suits.forEach(function (suit) {
		values.forEach(function (value) {
			let card = {};
			card.suit = suit;
			card.value = value;
			deck.push(card);
		});
	});
}
makeDeck(deck);
console.log(deck);

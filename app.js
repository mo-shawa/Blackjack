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
	pHand = [];
	pHandVal = 0;
	dHand = [];
	dHandVal = 0;
	won = false;
	deck = [];
	makeDeck(deck);
	shuffle(deck);
	deal(deck);
	render();
}

//Render
function render() {
	pHandVal = calcHandVal(pHand);
	dHandVal = calcHandVal(dHand);
	console.log(pHandVal);
	calcHandVal(dHand);
	console.log(dHandVal);
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
	return deck;
}

// Shuffle deck

function shuffle() {
	// return hands before shuffling?
	// pHand.forEach(function(){
	//     deck.push(pHand.pop())
	// })
	// dHand.forEach(function(){
	//     deck.push(dHand.pop())
	// })

	for (let j = 0; j < 1000; j++) {
		for (let i = 0; i < deck.length; i++) {
			let random = Math.floor(Math.random() * deck.length);
			let temp = deck[i];
			deck[i] = deck[random];
			deck[random] = temp;
		}
	}
	// console.log(deck);
}

// Deal cards
function deal(deck) {
	pHand.push(deck.pop(), deck.pop());
	dHand.push(deck.pop(), deck.pop());
}

//Calculate hand values
function calcHandVal(hand) {
	let sum = 0;
	hand.forEach(function (card, i) {
		if (card.value == "j" || card.value == "q" || card.value == "k") {
			sum += 10;
		} else if (card.value == "a") {
			sum + 11 <= 21 ? (sum += 11) : (sum += 1);
		} else {
			sum += card.value;
		}
		// console.log("hand:" + hand);
		// console.log(`argument: ${arguments}`);
	});
	return sum;
	console.log(`phand: ${pHandVal}`);
	console.log(`dhand: ${dHandVal}`);
}

makeDeck(deck);
// console.log(deck);
shuffle(deck);
// console.log(deck);
deal(deck);
// console.log(deck);
// console.log(pHand[1]);
// console.log(dHand[1]);
// console.log(deck);

shuffleBtn.addEventListener("click", function () {
	shuffle();
});

dealBtn.addEventListener("click", init);

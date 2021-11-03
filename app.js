//CONSTANTS
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

//CACHED ELEMENTS
const pHandEl = document.querySelector(".pHand");
const dHandEl = document.querySelector(".dHand");
const textEl = document.querySelector(".text");
// const deckEl = document.querySelector(".deck");

//buttons
const hitBtn = document.querySelector(".hit");
const stayBtn = document.querySelector(".stay");
const dealBtn = document.querySelector(".deal");
// const shuffleBtn = document.querySelector(".shuffle");

//Objects
const player = { hand: [], handVal: 0 };
const dealer = { hand: [], handVal: 0 };

//STATE VARIABLES
let deck = [];

// maybe use -1 0 1 instead of true false
let end = false;

//FUNCTIONS
function init() {
	player.hand = [];
	player.handVal = 0;
	dealer.hand = [];
	dealer.handVal = 0;
	textEl.innerHTML = "";
	end = false;
	deck = [];
	makeDeck(deck);
	shuffle(deck);
	deal(deck);
	render();
	dHandEl.firstChild.id = "flipped";
	dHandEl.firstChild.classList.add("back");
}

//Render
function render() {
	player.handVal = calcHandVal(player.hand);
	// if i disable either textContent, the whole thing breaks??
	// turns out it was clearing the html, if you take that out you get duplicates
	pHandEl.innerHTML = "";
	dealer.handVal = calcHandVal(dealer.hand);
	dHandEl.innerHTML = "";
	console.log(`phand: ${player.handVal} dhand: ${dealer.handVal}`);
	// checkBust();

	// render dealt cards

	// render player hand
	player.hand.forEach(function (card) {
		let cd = document.createElement("div");
		cd.classList.add("card");

		// Account for css class naming format
		let parseVal;
		typeof card.value == "number" && card.value < 10
			? (parseVal = `0${card.value}`)
			: (parseVal = card.value);
		cd.classList.add(card.suit[0] + parseVal);

		pHandEl.appendChild(cd);
	});

	// render dealer hand
	dealer.hand.forEach(function (card) {
		let cd = document.createElement("div");
		cd.classList.add("card");

		// Account for css class naming format
		let parseVal;
		typeof card.value == "number" && card.value < 10
			? (parseVal = `0${card.value}`)
			: (parseVal = card.value);
		cd.classList.add(card.suit[0] + parseVal);

		dHandEl.appendChild(cd);
	});

	// $('dHandEl div:first').addClass('back')
}

// hit function
function hit() {
	// debugger;
	if (end == true) {
		return;
	} else if (checkBust()) {
		end = true;
		textEl.textContent = "House wins! Press Deal to play again";
		return;
	} else {
		player.hand.push(deck.pop());
	}
	render();
	dHandEl.firstChild.classList.add("back");
	checkBust();
}

// stay function
function stay() {
	if (end == true) {
		return;
	}
	compareScore();
	end = true;
	render();
}

// compare values

function compareScore() {
	dealer.handVal = calcHandVal(dealer.hand);
	player.handVal = calcHandVal(player.hand);
	dHandEl.firstChild.classList.remove("back");

	while (dealer.handVal < 22) {
		if (dealer.handVal > 16) {
			if (dealer.handVal > player.handVal) {
				textEl.textContent = "House wins! Press Deal to play again.";
				return;
			} else if (dealer.handVal == player.handVal) {
				textEl.textContent = "Draw! Press Deal to play again.";
				return;
			} else {
				textEl.textContent = "Player wins! Press Deal to play again.";
				return;
			}
		} else if (dealer.handVal < 17) {
			if (dealer.handVal > player.handVal) {
				textEl.textContent = "House wins! Press Deal to play again.";
				return;
			} else if (dealer.handVal <= player.handVal) {
				while (dealer.handVal < 17) {
					dealer.hand.push(deck.pop());
					dealer.handVal = calcHandVal(dealer.hand);
				}
			}
		}
		if (dealer.handVal > player.handVal && dealer.handVal < 22) {
			textEl.textContent = "House wins! Press Deal to play again.";
			end = true;
			return dealer.handVal;
		} else if (dealer.handVal >= 17 && dealer.handVal < 22) {
			textEl.textContent = "Player wins! Press Deal to play again.";
		}
	}
	textEl.textContent = "House bust, Player wins! Press Deal to play again.";
}
// dealer.hand.unshift(deck.pop());

// check bust
function checkBust() {
	player.handVal = calcHandVal(player.hand);
	dealer.handVal = calcHandVal(dealer.hand);
	if (player.handVal > 21) {
		dHandEl.firstChild.classList.remove("back");
		textEl.textContent = "Player bust, House wins! Press Deal to play again.";
		return true;
	}
	if (dealer.handVal > 21) {
		textEl.textContent = "House bust, Player wins! Press Deal to play again.";
		return true;
	}
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
	for (let j = 0; j < 1000; j++) {
		for (let i = 0; i < deck.length; i++) {
			let random = Math.floor(Math.random() * deck.length);
			let temp = deck[i];
			deck[i] = deck[random];
			deck[random] = temp;
		}
	}
}

// Deal cards
function deal(deck) {
	player.hand.push(deck.pop(), deck.pop());
	dealer.hand.push(deck.pop(), deck.pop());
}

//Calculate hand values
function calcHandVal(hand) {
	let sum = 0;
	hand.forEach(function (card, i) {
		if (card.value == "J" || card.value == "Q" || card.value == "K") {
			sum += 10;
		} else if (card.value == "A") {
			sum + 11 <= 21 ? (sum += 11) : (sum += 1);
		} else {
			sum += card.value;
		}
	});
	return sum;
}

// shuffleBtn.addEventListener("click", function () {
// 	shuffle();
// });

// dealBtn.addEventListener("click", init);

dealBtn.addEventListener("click", init);
hitBtn.addEventListener("click", function () {
	end == false ? hit() : undefined;
});
stayBtn.addEventListener("click", function () {
	end == false ? stay() : undefined;
});
// stayBtn.addEventListener("click", stay);

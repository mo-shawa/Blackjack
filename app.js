//CONSTANTS
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

//CACHED ELEMENTS
const pHandEl = document.querySelector(".pHand");
const dHandEl = document.querySelector(".dHand");
const deckEl = document.querySelector(".deck");
const textEl = document.querySelector(".text");
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
// maybe use -1 0 1 instead of true false
let end = false;

//FUNCTIONS
function init() {
	pHand = [];
	pHandVal = 0;
	dHand = [];
	dHandVal = 0;
  textEl.innerHTML = ''
	end = false;
	deck = [];
	makeDeck(deck);
	shuffle(deck);
	deal(deck);
	render();
}

//Render
function render() {
	pHandVal = calcHandVal(pHand);
	// if i disable either textContent, the whole thing breaks??
	// turns out it was clearing the html, if you take that out you get duplicates
	pHandEl.innerHTML = "";

	dHandVal = calcHandVal(dHand);
	dHandEl.innerHTML = "";
	calcHandVal(dHand);

	checkBust();

	// render dealt cards

	// render player hand
	pHand.forEach(function (card) {
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
	// probably could have avoided this by creating user and dealer objects
	dHand.forEach(function (card) {
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
  dHandEl.firstChild.classList.add('back')
  // $('dHandEl div:first').addClass('back')
}

// hit function
function hit() {
	if (checkBust()) {
    dHandEl.firstChild.classList.toggle('back')

		textEl.textContent = "House wins! Press Deal to play again";
		return;
	} else {
		pHand.push(deck.pop());
	}
	render();
}

// stay function
function stay() {
	checkDealer();
	console.log("stey");
  render()
}

// check dealer
function checkDealer() {
  dHandEl.firstChild.classList.toggle('back')
  if (dHandVal <17 && dHandVal <pHandVal){
	dHand.push(deck.pop())
}
}
// check bust
function checkBust() {
	return pHandVal > 21;
	// {
	// 	pHandEl.style.color = "red";
	// 	return true;
	// } else {
	// 	return false;
	// }
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

shuffleBtn.addEventListener("click", function () {
	shuffle();
});

dealBtn.addEventListener("click", init);

hitBtn.addEventListener("click", function(){
  end == false ? hit() : undefined
});
stayBtn.addEventListener("click", stay);

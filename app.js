//CONSTANTS
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

//CACHED ELEMENTS
const pHandEl = document.querySelector(".pHand");
const dHandEl = document.querySelector(".dHand");
const textEl = document.querySelector(".text");
// Buttons
const hitBtn = document.querySelector(".hit");
const stayBtn = document.querySelector(".stay");
const dealBtn = document.querySelector(".deal");

// Objects
const player = { hand: [], handVal: 0, el: pHandEl };
const dealer = { hand: [], handVal: 0, el: dHandEl };

//STATE VARIABLES
let gsapCounter = 3
let deck = [];
let end = false;

//FUNCTIONS
function init() {
	player.hand = [];
	player.handVal = 0;
	dealer.hand = [];
	dealer.handVal = 0;
	textEl.innerHTML = "";
	textEl.style.display = 'none'
	end = false;
	// Allows us to track cards for hit animation
	gsapCounter = 3
	deck = [];
	makeDeck(deck);
	shuffle(deck);
	deal(deck);
	render();
	dHandEl.firstChild.id = "flipped";
	dHandEl.firstChild.classList.add("back");
	// Animate cards on deal
	gsap.from($(".pHand>.card"), {
		duration: 0.4,
		opacity: 0,
		y: "-200%",
		stagger: 0.5,
		ease: "power4.inOut"
	})
	gsap.from($(".dHand>.card"), {
		duration: 0.4,
		opacity: 0,
		y: "-200%",
		stagger: 0.5,
		delay: 0.25,
		ease: "power4.inOut"
	});
}

// Render
function render() {
	player.handVal = calcHandVal(player.hand);
	dealer.handVal = calcHandVal(dealer.hand);
	// turns out it was clearing the html, if you take that out you re-render already rendered cards
	pHandEl.innerHTML = "";
	dHandEl.innerHTML = "";

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
	;

	// render dealer hand
	dealer.hand.forEach(function (card) {
		let cd = document.createElement("div");
		cd.classList.add("card");
		let parseVal;
		typeof card.value == "number" && card.value < 10
			? (parseVal = `0${card.value}`)
			: (parseVal = card.value);
		cd.classList.add(card.suit[0] + parseVal);

		dHandEl.appendChild(cd);
	});
}

// hit function
function hit() {
	if (end == true) {
		return;
	} else {
		player.hand.push(deck.pop());
	}
	render();
	// Animate in added cards
	gsap.from($(`.pHand>.card:nth-child(${gsapCounter})`), { duration: 0.3, y: "-400%", stagger: 0.5 });
	// Reapply hidden card class that was removed by render clearing board
	dHandEl.firstChild.classList.add("back");
	// Increment animation counter
	gsapCounter++
	// End game 
	checkBust();

}

// stay function
function stay() {
	if (end == true) {
		return;
	}
	textEl.style.display = 'flex'
	gsap.from(".text", { duration: 0.3, opacity: 0, delay: 0.6 })
	compareScore();
	end = true;
	render();
	// Animate dealer cards 
	gsap.from($(`.dHand>.card:nth-child(n+${gsapCounter})`), { duration: 0.3, y: "-200%", stagger: 0.3, delay: 0.3 });
}

// Compare Player and Dealer hand values

function compareScore() {
	dealer.handVal = calcHandVal(dealer.hand);
	player.handVal = calcHandVal(player.hand);
	dHandEl.firstChild.classList.remove("back");
	// Comparison logic
	while (dealer.handVal < 22) {
		if (dealer.handVal > 16) {
			if (dealer.handVal > player.handVal) {
				end = true
				textEl.textContent = "House wins! Press Deal to play again.";
				return;
			} else if (dealer.handVal == player.handVal) {
				end = true
				textEl.textContent = "Draw! Press Deal to play again.";
				return;
			}
			// Dealer only hits on 17 if hand has an ace
			else if ((dealer.handVal == 17) && (dealer.hand.some(card => card.value == 'A'))) {
				dealer.hand.push(deck.pop())
				dealer.handVal = calcHandVal(dealer.hand)
			}
			else {
				end = true
				textEl.textContent = "Player wins! Press Deal to play again.";
				return;
			}
		} else if (dealer.handVal < 17) {
			if (dealer.handVal > player.handVal) {
				end = true
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

// check bust
function checkBust() {
	player.handVal = calcHandVal(player.hand);
	dealer.handVal = calcHandVal(dealer.hand);
	if (player.handVal > 21) {
		dHandEl.firstChild.classList.remove("back");
		textEl.textContent = "Player bust, House wins! Press Deal to play again.";
		textEl.style.display = 'flex'
		gsap.from(".text", { duration: 0.3, opacity: 0, delay: 0.6 })
		end = true
		return true;

	}
	if (dealer.handVal > 21) {
		textEl.textContent = "House bust, Player wins! Press Deal to play again.";
		textEl.style.display = 'flex'
		gsap.from(".text", { duration: 0.3, opacity: 0, delay: 0.6 })
		end = true
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

	//////////////////////////////////

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
			// default ace value to 11
			sum += 11
		} else {
			sum += card.value;
		}
	});
	// Track number of Aces in a hand
	let aces = []
	aces = hand.filter(card => card.value == 'A')
	// Reduce value only if needed
	if (aces.length == 1) {
		if (sum > 21) {
			sum -= 10
		}
	} else if (aces.length == 2) {
		sum -= 10
		if (sum > 21) {
			sum -= 10
		}
	} else if (aces.length > 2) {
		sum -= 10
		if (sum > 21) {
			sum -= 10
		}
		if (sum > 21) {
			sum -= 10
		}
	}

	return sum;
}

// Click listeners
dealBtn.addEventListener("click", init)
hitBtn.addEventListener("click", function () {
	end == false ? hit() : undefined;
});
stayBtn.addEventListener("click", function () {
	end == false ? stay() : undefined;
});

//animate buttons on startup
gsap.from($("button"), { duration: 0.4, opacity: "0", y: '70%', stagger: 0.1 })

// animate board on startup
gsap.from($(".board"), { duration: 0.3, opacity: "0", y: '-10%', delay: "0.7" })
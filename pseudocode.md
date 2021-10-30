# Pseudocode for Blackjack

```
// constants
const suits = hearts, diamonds, clubs, spades

const values = 2, 3, 4, 5, 6, 7, 8, 9, J, Q, K, A


// cached elements
grab html elements : deck, buttons(hit,stay,deal,shuffle), player hand, house hand



// state variables
deck
player hand
player hand value
house hand
house hand value
won

// functions

init
    if no deck,
        makeDeck
    run shuffle
    player hand = []
    pHand value = 0

    house hand = []
    hHand value = 0

    won = false

// might be a good situation to get practice with classes
define function makeDeck

    foreach suits
        foreach values
            let card object
            card has value from values
            card has suit from suits
            push card to deck

    return deck

define function shuffle
    function takes deck
    for x iterations
        swap deck at random index with deck at random index
    return deck

define function render
    // not so clear what to do here yet
    for each card in player hand
        create div with classes from css card library based on suit and value
        append div to player hand element
    for each card in house hand
        create div with classes from css card library based on suit and value
        append div to house hand element

    grab deck html element
    // can probably just render the top card or so
        create div from each item with classes of its suit and value

        give div appropriate classes from css card library based on suit and value keys

        append card to deck element


define function deal
    make deck
    shuffle deck
    push from deck to player hand x 2
    push from deck to house hand x 2
    // using pop or unshift might be good


define function calcHandValue
    let sum
    let
    for each card in hand
        if card.value is J K or Q
            sum += 10
        else if card.value is A
            sum += 11 or 1
            // have to account for dual value somehow
        else
            sum += card.value
    return sum



// event listeners

deal click event listener
    run init function
    run calcHandValue
    if calcHandValue returns 21
        winner = player
    else await hit or stay
    run render function


manual shuffle button event listener
    push dealer hand into deck
    push player hand into deck
    run shuffle function

hit button click listener (function)
    push from deck to player hand
    if calcHandValue returns > 21
        player loses








```
Testing WSL 
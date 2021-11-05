# Blackjack

Welcome to Blackjack, One of the most popular card games in the world! This is a JavaScript-DOM-based take on one of my favorite card games. 

<img src="https://i.gyazo.com/2c3e697939be6efc3861f913e7038636.png">

This version was created using HTML, CSS, JavaScript, jQuery, and GSAP.

Click <a href='https://mo-shawa.github.io/Blackjack/'>here</a> to play!

---

The goal in Blackjack is to beat the dealer's hand without going over 21. 

Hand value is calculated according to these rules:
<li> Numbered cards are worth their number.
<li> Face cards (J, Q, K) are worth 10.
<li> Aces are worth 1 or 11, depending on what gives you a better hand.


---

## Game Start
Each player starts with 2 cards, with one of the dealer's cards being hidden until the player ends their turn.

The player can `hit` to add another card to their hand, or `stay` to end their turn.

If you go over 21 (aka `bust`), the dealer wins automatically.

After the player `stays`, the dealer will continue to `hit` as long as their hand value is less than 17.

---

### Future updates:

- [ ] Card reveal animation 
- [ ] Fix dealer animations not always playing
- [ ] Realistic anima`tions 
- [ ] Dynamic result animations (currently fixed delay) 
- [ ] Multiple player support
- [ ] Betting system
- [x] Correctly calculate hands with multiple aces
- [ ] Dealer hits on soft 17 & draw
- [ ] Splitting hands


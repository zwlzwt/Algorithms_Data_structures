let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];

class Cards {
  constructor(suits, values) {
    this.suits = suits;
    this.values = value;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }

  createDeck(suits, values) {
    for(let suit of suits) {
      for(let val of values) {
        this.deck.push(new Cards(suit, val));
      }
    }
    return this.deck;
  }

  shuffle() {
    let counter = this.deck.length;
    while (counter) {
      const i = Math.floor((Math.random() * counter--))
      [this.deck[i], this.deck[counter]] = [this.deck[counter], this.deck[i]]
    }
    return this.deck
  }

  deal() {
    let hand = [];
    while (hand.length < 2) {
      hand.push(this.deck.pop());
    }
  }
}
import { RandomWholeNumber } from "./RandomNumber";

enum Suits {
  Hearts = 1,
  Clubs,
  Diamonds,
  Spades,
}

enum Values {
  Joker = 0,
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

class Deck {
  private deck: Array<Card>;

  constructor(jokers?: boolean) {
    this.deck = jokers
      ? [
          new Card(Suits.Hearts, Values.Joker),
          new Card(Suits.Spades, Values.Joker),
        ]
      : [];
    if (jokers !== undefined) {
      //Suits
      for (let i = 1; i <= 4; i++) {
        //Values
        for (let j = 1; j <= 13; j++) {
          this.deck.push(new Card(i, j));
        }
      }
    }
  }

  //Returns number of cards left in deck
  public size(): Number {
    return +this.deck.length;
  }

  //Returns if can draw a card
  public canDraw(): boolean {
    return +this.size() > 0;
  }

  //Adds a card to top of deck
  public addToTop(card: Card) {
    this.deck.unshift(card);
  }

  //Adds a card to the bottom of the deck
  public addToBottom(card: Card) {
    this.deck.push(card);
  }

  //Adds a deck to top of the deck
  public addDecktoTop(deck: Deck) {
    while (deck.canDraw()) {
      this.addToTop(deck.draw());
    }
  }

  //Adds a deck to bottom of the deck
  public addDeckToBottom(deck: Deck) {
    while (deck.canDraw()) {
      this.addToBottom(deck.draw());
    }
  }

  //returns card from top of deck
  public draw(): Card {
    if (this.canDraw()) {
      return this.deck.shift();
    }
    return null;
  }

  //Removes a card at a certain position 0 based
  public remove(position?: number) {
    if (position) {
      let card = this.deck[position];
      this.deck = [
        ...this.deck.slice(0, position),
        ...this.deck.slice(position + 1, this.deck.length),
      ];
      return card;
    }
    return this.draw();
  }

  //Shuffles deck
  public shuffle() {
    if (this.canDraw()) {
      let shuffle = [];
      let rand = new RandomWholeNumber();
      rand.setMinMax(0, 5000);
      while (this.canDraw()) {
        shuffle.push({ card: this.draw(), shuffleValue: rand.next() });
      }
      shuffle.sort((a, b) => {
        return a.shuffleValue - b.shuffleValue;
      });
      for (let card of shuffle) {
        this.deck.push(card.card);
      }
    }
  }
}

class Card {
  //Card suits 1=hearts,2=clubs,3=diamonds,4=spades
  private suit: Number;
  //Card values 1=A, 11=Jack,12=Queen,13=King,0=joker
  private value: Number;

  constructor(suit: Suits, value: Values) {
    this.suit = suit;
    this.value = value;
  }

  public getSuit(): number {
    return +this.suit;
  }

  public getValue(): number {
    return +this.value;
  }

  public isRed(): boolean {
    return +this.suit % 2 === 1;
  }

  public isBlack(): boolean {
    return !this.isRed();
  }

  public compareValue(card: Card): number {
    if (card.getValue() === this.getValue()) {
      return 0;
    }
    return this.getValue() < card.getValue() ? -1 : 1;
  }

  public suitToString(): String {
    return Suits[+this.suit];
  }

  public valueToString(): String {
    return Values[+this.value];
  }

  public toString(): String {
    return this.valueToString() + " of " + this.suitToString();
  }
}

export { Card, Deck };
export { Values, Suits };

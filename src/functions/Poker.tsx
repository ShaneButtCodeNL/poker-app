import { Card, Deck } from "./Deck";

class Poker {
  //The minimum amount allowed for a bet
  private minBet: Number;
  //Sum of the bets for current round
  private pot: Number;
  //Number of players in game 1-4
  private numOfPlayers: Number;
  //Array of hands holds current hands
  private heldCards: Array<Array<Card>>;
  //Array holding the cash of each player
  private heldCash: Array<Number>;
  //The deck of cards with no jokers
  private deck: Deck;
  //Discsrded cards added back to the deck when it runs out
  private discardPile: Deck;
  //Functions for altering state of app
  private stateFunctions: any;

  /**
   * Sets up initial state of the game
   * @param minBet The minimum allowable bet for this game
   * @param startCash The amount of Money each player starts with
   * @param numOfPlayers The number of players
   */
  constructor(
    minBet: Number,
    startCash: Number,
    numOfPlayers: Number,
    stateFunctions: any
  ) {
    this.pot = 0;
    this.stateFunctions.setPot(this.pot);
    this.stateFunctions = stateFunctions;
    this.minBet = +minBet;
    this.deck = new Deck(false);
    this.discardPile = new Deck();
    this.numOfPlayers = +numOfPlayers;
    this.heldCards = [];
    this.heldCash = [];
    //Shuffle deck 5 times just because
    for (let i = 0; i < 5; i++) {
      this.deck.shuffle();
    }
    //Set up players
    for (let i = 0; i < this.numOfPlayers; i++) {
      //Gives Player cash
      this.heldCash.push(startCash);
      //Draw 5 cards for player
      let hand = [];
      for (let j = 0; j < 5; j++) {
        hand.push(this.deck.draw());
      }
      this.heldCards.push(hand);
    }
    this.stateFunctions.setHeldCash(this.heldCash);
    this.stateFunctions.setHeldCards(this.heldCards);
  }

  //The ammount of cards remaining in the deck
  public getDeckSize() {
    return this.deck.size();
  }

  //The ammount of cards in the discard pile
  public getDiscardPileSize() {
    return this.discardPile.size();
  }

  /**
   * Draws a card from the deck if the deck is empty adds discarded cards to the deck then shuffles and draws
   */
  private draw() {
    if (!this.deck.canDraw) {
      this.deck.addDeckToBottom(this.discardPile);
      this.discardPile = new Deck();
      this.deck.shuffle();
    }
    return this.deck.draw();
  }

  /**
   * Discard cards from hand and draw new ones
   * @param player The player number who is discarding and drawing zero based
   * @param cardPositions The zero based positions of cards they are discarding ex [0,1,4]
   */
  public discardAndDraw(player: Number, cardPositions: Array<Number>) {
    let hands = [...this.heldCards];
    for (let pos in cardPositions) {
      this.discardPile.addToTop(hands[+player][+pos]);
      hands[+player][pos] = this.draw();
    }
    this.heldCards = [...hands];
    this.stateFunctions.setHeldCards([...hands]);
  }

  /**
   * Allows a player to make a bet
   * @param player The player makeing the bet
   * @param bet The amount to be bet
   */
  public makeBet(player: Number, bet: Number) {
    //Bet is high enough
    if (bet >= this.minBet) {
      //Has money for bet
      if (this.heldCash[+player] >= +bet) {
        let cash = [...this.heldCash];
        cash[+player] = +cash[+player] - +bet;
        this.pot = +this.pot + +bet;
        this.stateFunctions.setHeldCash([...cash]);
        this.heldCash = [...cash];
        this.stateFunctions.setPot(this.pot);
      }
    }
    /************************** 
        TODO ERROR HANDLEING
    **************************/
    return;
  }

  public allIn(player: Number) {
    let cash = [...this.heldCash];
    this.pot = +this.pot + +cash[+player];
    cash[+player] = 0;
    this.stateFunctions.setHeldCash([...cash]);
    this.heldCash = [...cash];
    this.stateFunctions.setPot(this.pot);
  }
}
export default Poker;

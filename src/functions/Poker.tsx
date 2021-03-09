import { Card, Deck } from "./Deck";
import { BadPokerCards } from "./BadPokerLogic";

class Poker {
  //The minimum amount allowed for a bet
  private minBet: Number;
  //Current bet
  private currentBet: Number;
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
  //Discarded cards added back to the deck when it runs out
  private discardPile: Deck;
  //Functions for altering state of app
  private stateFunctions: any;
  //Amount betted this round
  private bets: Array<Number>;
  //Current round of turn
  private round: Number;
  //Keepstrack of turns in a round
  private turnCount: Number;

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
    this.stateFunctions = stateFunctions;
    this.pot = 0;
    this.round = 1;
    this.turnCount = 0;
    this.round = 1;
    this.bets = [];
    this.stateFunctions.setPot(this.pot);
    this.minBet = +minBet;
    this.currentBet = +minBet;
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
      //initialize bets
      this.bets.push(0);
      //Draw 5 cards for player
      let hand = [];
      for (let j = 0; j < 5; j++) {
        hand.push(this.deck.draw());
      }
      this.heldCards.push(hand);
    }
    this.stateFunctions.setHeldCash([...this.heldCash]);
    this.stateFunctions.setHeldCards(this.heldCards);
    stateFunctions.setDeck(this.deck);
    stateFunctions.setDiscardPile(this.discardPile);
    stateFunctions.setRound(this.round);
  }

  /**
   * Checks if all players playing in round bet same ammount
   * @returns All players that are playing bets are equal
   */
  public checkBets() {
    //Just getting an ammount betted useing main players bet
    let betAmmount = this.bets[0];
    //For each player
    for (let i = 0; i < this.numOfPlayers; i++) {
      //If player is playing
      if (!this.isOut(+i)) {
        //If they bet differently than main player
        if (this.bets[+i] !== betAmmount) return false;
      }
    }
    return true;
  }

  /**
   * Checks if a player has folded
   * @param player The player number
   */
  public isOut(player: Number) {
    //Checks if a player is playing in round by checking if they have a hand
    return this.heldCards[+player].length === 0;
  }

  /**
   * Checks if a player can make a bet
   * @param player The Player betting
   * @param bet The bet they want to make
   */
  public canBet(player: Number, bet?: Number) {
    return (
      this.heldCash[+player] >=
      +(bet ? bet : this.currentBet) - +this.bets[+player]
    );
  }

  /**
   * Checks if a player can check
   */
  public canCheck() {
    for (let bet of this.bets) {
      if (bet) return false;
    }
    return true;
  }

  /**
   * Gets whose turn it is
   * @returns The player number turn
   */
  private getPlayerTurn() {
    return +this.turnCount % +this.numOfPlayers;
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
   * Reset states for new round of play
   */
  public reset() {
    //Resets turn counter
    this.turnCount = 0;
    //Resets current min bet
    this.currentBet = this.minBet;
    //Resets hands
    let hands = [...this.heldCards];
    for (let hand of hands) {
      for (let card of hand) {
        this.discardPile.addToTop(card);
      }
    }
    hands = [];
    //resets made bets
    for (let i = 0; i < this.bets.length; i++) {
      this.bets[i] = 0;
    }
    this.stateFunctions.setHeldCards([]);
  }

  private resetBets() {
    for (let i = 0; i < this.bets.length; i++) {
      this.bets[i] = 0;
    }
  }

  /**
   * Draws a card from the deck if the deck is empty adds discarded cards to the deck then shuffles and draws
   */
  private async draw() {
    if (!this.deck.canDraw()) {
      this.deck.addDeckToBottom(this.discardPile);
      this.discardPile = new Deck();
      this.stateFunctions.setDiscardPile(this.discardPile);
      this.deck.shuffle();
    }
    const card = this.deck.draw();
    this.stateFunctions.setDeck(this.deck);
    return card;
  }

  /**
   * Discard cards from hand and draw new ones
   * @param player The player number who is discarding and drawing zero based
   * @param cardPositions The zero based positions of cards they are discarding ex [0,1,4]
   */
  public async discardAndDraw(player: Number, cardPositions: Array<Number>) {
    //Copy hands
    let hands = [...this.heldCards];
    //For each selected card position
    for (let pos of cardPositions) {
      //Add selected card to discard pile
      this.discardPile.addToTop(hands[+player][+pos]);
      //Draw new card and place in hand in same position
      await this.draw().then((card) => {
        console.log(card.toString());
        hands[+player][+pos] = card;
      });
      /**
       * *********Testing remove
       */
      console.log(
        "Deck:",
        this.getDeckSize(),
        "\nDiscard:",
        this.getDiscardPileSize()
      );
      //***************** */
    }
    //Update states
    this.stateFunctions.setDiscardPile(this.discardPile);
    this.stateFunctions.setDeck(this.deck);
    this.heldCards = [...hands];
    this.stateFunctions.setHeldCards([...hands]);
  }

  /**
   * Allows a player to make a bet
   * @param player The player makeing the bet
   * @param bet The amount to be bet
   */
  public async makeBet(player: Number, bet: Number) {
    //Bet is high enough
    if (+bet + +this.bets[+player] >= this.currentBet) {
      //Has money for bet
      if (this.heldCash[+player] >= +bet) {
        //Update current bet
        this.updateBet(+bet + +this.bets[+player]);
        //Copy money held
        let cash = [...this.heldCash];
        //Take bet from player
        cash[+player] = +cash[+player] - +bet;
        //Add bet to pot
        this.pot = +this.pot + +bet;
        //Updates cash ammounts
        this.stateFunctions.setHeldCash([...cash]);
        this.heldCash = [...cash];
        //Updates pot
        this.stateFunctions.setPot(this.pot);
        //Updates current bet
        this.bets[+player] = +this.bets[+player] + +bet;
      }
    }
    /************************** 
        TODO ERROR HANDLEING
    **************************/
    return;
  }

  /**
   * Initial bet to play a game of poker
   * @param player player to ante if null everyone antes
   */
  public ante(player?: number) {
    if (player === null) {
      for (let i = 0; i < this.numOfPlayers; i++) {
        this.makeBet(i, this.minBet);
      }
      return;
    }
    this.makeBet(player, this.minBet);
  }

  public allIn(player: Number) {
    let cash = [...this.heldCash];
    this.pot = +this.pot + +cash[+player];
    cash[+player] = 0;
    this.stateFunctions.setHeldCash([...cash]);
    this.heldCash = [...cash];
    this.stateFunctions.setPot(this.pot);
  }

  /**
   * Player makes the min allowable bet
   * @param player The player making a bet
   */
  public async call(player: Number) {
    if (this.canBet(+player)) this.makeBet(+player, this.currentBet);
  }

  /**
   * Updates min allowed bet this round
   * @param bet The amount needed to call
   */
  public updateBet(bet: Number) {
    this.currentBet = +bet;
  }

  /**
   * Player raises the minimum bet needed to play
   * @param player The Player Raiseing
   * @param newBet The Amount they are raising to
   */
  public raise(player: Number, newBet: Number) {
    if (this.canBet(+player, +newBet)) {
      this.updateBet(newBet);
      this.makeBet(player, +newBet - +this.bets[+player]);
    }
  }

  /**
   * First turn in a round of play everyone antes to play if they can't they are out
   */
  public deal() {
    let hands = [];
    //set up players
    for (let i = 0; i < this.numOfPlayers; i++) {
      //Can ante? if can't they are out of the game
      if (this.canBet(i, this.minBet)) {
        this.ante(i);
        let hand = [];
        //Draw 5 cards
        for (let j = 0; j < 5; j++) {
          hand.push(this.draw());
        }
        hands.push(hand);
      } else {
        //Empty hand
        hands.push([]);
      }
    }
    this.stateFunctions.setHeldCards([...hands]);
  }

  /**
   * A round where players that can play or haven't folded may call or raise bet
   * @param bet Human players bet
   */
  public async bettingRound(bet: Number) {
    //Round continues until all bets are equal and each player has had a turn to bet
    while (this.turnCount < this.numOfPlayers) {
      //Computer Players
      if (this.getPlayerTurn()) {
        //Simple logic for now computers will only call
        await this.call(+this.getPlayerTurn());
      }
      //Human Player
      else {
        //Make player bet
        this.makeBet(0, bet);
      }
      //Increment turn count
      this.turnCount = +this.turnCount + 1;
    }
    //Reset values after round ends
    this.turnCount = 0;
    this.currentBet = this.minBet;
    this.resetBets();
  }

  /**
   * A round where players may discard cards to get different cards
   * @param cardPos Cards player wants to discard
   */
  public async discardTurn(cardPos: Array<Number>) {
    while (+this.turnCount < +this.numOfPlayers) {
      //Computer Players
      //Update later use badPokerCards for testing
      if (this.getPlayerTurn()) {
        await BadPokerCards().then((pos) =>
          this.discardAndDraw(this.getPlayerTurn(), pos)
        );
      }
      //Human
      else {
        await this.discardAndDraw(0, cardPos);
      }
      this.turnCount = +this.turnCount + 1;
    }
    this.turnCount = 0;
    this.stateFunctions.setPlayerTurn(0);
  }
}
export default Poker;

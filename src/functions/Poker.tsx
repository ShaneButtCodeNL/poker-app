import { Card, Deck, Suits, Values } from "./Deck";
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
    this.round = 0;
    this.turnCount = 0;
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
      this.bets.push(0);
    }
    this.stateFunctions.setHeldCash([...this.heldCash]);
    stateFunctions.setDeck(this.deck);
    stateFunctions.setDiscardPile(this.discardPile);
    stateFunctions.setRound(this.round);
  }

  /**
   * Checks if all players playing in round bet same ammount
   * @returns All players that are playing bets are equal
   */
  public checkBets() {
    console.log("Starting checkBets");
    //Just getting an ammount betted useing main players bet
    let betAmmount = this.bets[0];
    for (let bet of this.bets) {
      console.log(bet);
    }
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

  //Gets the current amount needed to bet
  public getCurrentBet(player: number) {
    return +this.bets[0] === +this.minBet
      ? this.minBet
      : +this.currentBet - +this.bets[player];
  }

  /**
   * Reset states for new round of play
   */
  public reset() {
    this.resetBets();
    //Resets hands
    let hands = [...this.heldCards];
    for (let hand of hands) {
      for (let card of hand) {
        this.discardPile.addToTop(card);
      }
    }
    hands = [];
    this.stateFunctions.setHeldCards([]);
  }

  public resetBets() {
    //Resets turn counter
    this.turnCount = 0;
    //Resets current min bet
    this.currentBet = this.minBet;
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
    if (+bet >= +this.getCurrentBet(+player)) {
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
        const newBets = [...this.bets];
        newBets[+player] = +this.currentBet;
        this.bets = [...newBets];
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
    if (this.canBet(+player))
      this.makeBet(+player, this.getCurrentBet(+player));
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
  public async deal() {
    console.log("Start deal");
    let hands = [];
    //set up players
    for (let i = 0; i < this.numOfPlayers; i++) {
      //Can ante? if can't they are out of the game
      if (this.canBet(i, this.minBet)) {
        this.ante(i);
        let hand = [];
        //Draw 5 cards
        for (let j = 0; j < 5; j++) {
          await this.draw().then((card) => {
            hand.push(card);
          });
          console.log(hand[j].toString());
        }
        hands.push(hand);
      } else {
        //Empty hand
        hands.push([]);
      }
    }
    this.heldCards = [...hands];
    this.stateFunctions.setHeldCards([...hands]);
    //return [...hands];
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
        await this.makeBet(0, bet);
      }
      //Increment turn count
      this.turnCount = +this.turnCount + 1;
    }
    this.turnCount = 0;
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

  /********************************************************************************
   * Victory conditions
   ********************************************************************************/

  //Helper function
  private formatNumber(num: Number) {
    if (num < 10) return "0" + num;
    return "" + num;
  }

  /**
   * Makes a map from a five card hand
   * @param hand A 5 card Array
   * @returns The map of values
   */
  private makeValueMap(hand: Array<Card>) {
    const map = new Map();
    for (let card of hand) {
      let value = card.getValue();
      map.set(value, map.has(value) ? map.get(value) + 1 : 1);
    }
    return map;
  }

  /**
   * Gets a score for the hand that helps in breaking ties score is based on hand then on high cards.
   * @param hand An array of five cards
   * @returns The score of the hand
   */
  private getHandScore(hand: Array<Card>) {
    let score: Array<String> = [];
    hand.forEach((card) => {
      if (card.getValue() === Values.Ace) {
        score.push(this.formatNumber(14));
      } else {
        score.push(this.formatNumber(card.getValue()));
      }
    });
    score.sort((a, b) => {
      return +b - +a;
    });
    if (this.checkRoyalFlush(hand)) score.unshift("9");
    else if (this.checkStraightFlush(hand)) score.unshift("8");
    else if (this.checkFourKind(hand)) score.unshift("7");
    else if (this.checkFullHouse(hand)) score.unshift("6");
    else if (this.handIsFlush(hand)) score.unshift("5");
    else if (this.checkStraight(hand)) score.unshift("4");
    else if (this.checkThreeKind(hand)) score.unshift("3");
    else if (this.checkTwoPair(hand)) score.unshift("2");
    else if (this.checkPair(hand)) score.unshift("1");

    return parseInt(score.join(""));
  }

  /**
   * Checks if a five card hand is a flush. Each card is the same suit.
   * @param hand The five card hand we are checking
   * @returns If hand is a flush
   */
  private handIsFlush(hand: Array<Card>) {
    let suit = hand[0].getSuit();
    for (let card of hand) {
      if (card.getSuit() !== suit) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if a 5 card hand is a royal flush Ace,10,jack,queen, and king
   * @param hand The 5 card hand to be checked
   * @returns If this hand contains a royal flush
   */
  private checkRoyalFlush(hand: Array<Card>) {
    //Check for flush
    if (!this.handIsFlush(hand)) return false;
    let handSet = new Set();
    for (let card of hand) {
      handSet.add(card.getValue());
    }
    const royalFlush = [
      Values.King,
      Values.Queen,
      Values.Jack,
      Values.Ten,
      Values.Ace,
    ];
    for (let value of royalFlush) {
      if (!handSet.has(value)) return false;
    }
    return true;
  }

  /**
   * Checks if a hand contains a straight, A set of cards where values increase by one.Note a royal flushes and straight flushes are straights.
   * @param hand An array of 5 cards
   * @returns Is this a straight
   */
  private checkStraight(hand: Array<Card>) {
    let handCopy = [...hand].sort((a, b) => {
      return a.compareValue(b);
    });
    //Lowest value in hand
    const offset = handCopy[0].getValue();
    for (let i = offset; i < offset + 5; i++) {
      //i - offset will give position
      if (i !== handCopy[i - offset].getValue()) return false;
    }
    return true;
  }

  /**
   * Check if a five card hand is a straight flush. A set of cards where values increase by one and all the same suit. Note a royal flush is a straight flush.
   * @param hand The five card hand to be checked
   * @returns If hand is a straight flush
   */
  private checkStraightFlush(hand: Array<Card>) {
    return this.handIsFlush(hand) && this.checkStraight(hand);
  }

  /**
   * Checks to see if a hand has four of a kind, four of the five cards have same value
   * @param hand The 5 card hand to be checked
   * @returns  Is this hand a four of a kind
   */
  private checkFourKind(hand: Array<Card>) {
    const map = this.makeValueMap(hand);
    map.forEach((value) => {
      //If a key has a value of 4 then bingo
      if (value === 4) return true;
    });
    return false;
  }

  /**
   * Checks if hand has a three of a kind
   * @param hand An array of 5 cards
   * @returns does this hand contain a three of a kind
   */
  private checkThreeKind(hand: Array<Card>) {
    const map = this.makeValueMap(hand);
    map.forEach((value) => {
      //If a key has a value of 3 then bingo
      if (value === 3) return true;
    });
    return false;
  }

  /**
   * Checks if a hand has a pair of values
   * @param hand An array of five cards
   * @returns Does this hand have a pair of values
   */
  private checkPair(hand: Array<Card>) {
    const map = this.makeValueMap(hand);
    map.forEach((value) => {
      //If a key has a value of 2 bingo
      if (value === 2) return true;
    });
    return false;
  }

  /**
   * Checks if a hand has two pairs of values
   * @param hand An array of five cards
   * @returns Does this hand contain 2 pairs
   */
  private checkTwoPair(hand: Array<Card>) {
    const map = this.makeValueMap(hand);
    //Flag for finding a pair
    let foundAPair = false;
    map.forEach((value) => {
      if (value === 2) {
        if (foundAPair) return true;
        foundAPair = true;
      }
    });
    return false;
  }

  /**
   * Checks if a hand has a fullhouse
   * @param hand An array of 5 cards
   * @returns Does hand contain a fullhouse
   */
  private checkFullHouse(hand: Array<Card>) {
    const map = this.makeValueMap(hand);
    //Flags for finding a pair or triple
    let foundPair = false;
    let foundTriple = false;
    map.forEach((value) => {
      //Found three of a kind
      if (value === 3) {
        //Already found pair
        if (foundPair) return true;
        foundTriple = true;
      }
      //Found Pair
      if (value === 2) {
        //Already Found Triple
        if (foundTriple) return true;
        foundPair = true;
      }
    });
    return false;
  }
}
export default Poker;

import { Deck } from "./Deck";
/**
 *
 * @param numOfPlayers The number of players. 1 human rest CPU.Min 2 max 4
 * @param minBet The minimum bet you need to play a hand min 100
 * @param startCash The amount of money each player starts the game with
 * @param props functions and values passed to and from app
 */
export default function PokerGame(
  numOfPlayers: Number,
  minBet: Number,
  startCash: Number,
  props: any
) {
  //The Deck compriseing of one deck of standard playing cards with no jokers
  let deck = new Deck(false);
  //initial Shuffling of the deck
  deck.shuffle();
  //Crate hands for each player
  let hands = [];
  let cash = [];
  for (let i = 0; i < numOfPlayers; i++) {
    hands.push(new Deck());
    cash.push(startCash);
  }
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < numOfPlayers; j++) {
      hands[j].addToTop(deck.draw());
    }
  }
  //Set the state
  () => props.setHeldCards(hands);
  props.setHeldCash(cash);
  //return memory
  hands = null;
  cash = null;
  //Game loop
}

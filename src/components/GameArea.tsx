import { useEffect, useState } from "react";
import { Deck } from "../functions/Deck";
import Hand from "./Hand";
let deck = new Deck(false);
let discardPile = new Deck();
function GameArea(props: any) {
  ////////////////////////    States    ///////////////////////////////
  //Round of play 1 indexed
  let [turn, setTurn] = useState(1);
  //Player turn in round 0 indexed
  let [playerTurn, setPlayerTurn] = useState(0);

  //The Deck compriseing of one deck of standard playing cards with no jokers
  let game = (
    startCash: Number,
    minBet: Number,
    numOfPlayers: Number,
    setHeldCards: Function,
    setHeldCash: Function
  ) => {
    //The Deck compriseing of one deck of standard playing cards with no jokers
    //initial Shuffling of the deck
    if (deck.size() !== 52) {
      deck = new Deck(false);
      discardPile = new Deck();
    }
    for (let i = 0; i < 5; i++) {
      deck.shuffle();
    }
    //initial Create hands for each player
    let hands = [];
    let cash = [];
    for (let i = 0; i < numOfPlayers; i++) {
      hands.push([]);
      cash.push(startCash);
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < numOfPlayers; j++) {
        hands[j].push(deck.draw());
      }
    }
    //Set the state
    setHeldCards(hands);
    setHeldCash(cash);
    console.log(hands.length);
    console.log(cash[0]);

    //return memory
    hands = null;
    cash = null;
  };

  /**
   * Draws a card from deck if posible if can't adds discard pile to deck shuffles and then draws
   */
  const draw = () => {
    if (!deck.canDraw()) {
      deck.addDeckToBottom(discardPile);
      discardPile = new Deck();
      deck.shuffle();
    }
    return deck.draw();
  };

  /**
   * discards selected cards from a player's hand
   * then drawscards to replace him
   * @param cardPositions The 0 indexed position of cards to be replaced
   */
  const discardAndDraw = (cardPositions: Array<Number>) => {
    let hands = [...props.heldCards];
    for (let pos of cardPositions) {
      let card = draw();
      discardPile.addToTop(hands[playerTurn][+pos]);
      hands[playerTurn][+pos] = card;
    }
    //Set State
    props.setHeldCards(hands);
    //return mem
    hands = null;
  };

  //Render hand if player count is high enough
  const renderHand = (playerNumber: Number) => {
    if (playerNumber <= props.numOfPlayers) {
      if (!props.heldCards[+playerNumber - 1]) {
        return <div>Failed</div>;
      }
      return (
        <div>
          <Hand
            player={+playerNumber - 1}
            hand={props.heldCards[+playerNumber - 1]}
            discardAndDraw={discardAndDraw}
            mode={props.mode}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    game(
      props.startMoney,
      props.minBet,
      props.numOfPlayers,
      props.setHeldCards,
      props.setHeldCash
    );
  }, [props.numOfPlayers, props.startMoney, props.minBet]);
  return (
    <div>
      <div id="playAreaContainer">
        <div id="playArea">
          <div id="leftPlayArea">{renderHand(3)}</div>
          <div id="centerPlayArea">
            <div id="centerPlayAreaTop">{renderHand(2)}</div>
            <div id="centerPlayAreaCenter"></div>
            <div id="centerPlayAreaBottom">{renderHand(1)}</div>
          </div>
          <div id="rightPlayArea">{renderHand(4)}</div>
        </div>
      </div>
    </div>
  );
}

export default GameArea;

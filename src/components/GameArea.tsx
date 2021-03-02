import { useEffect, useState } from "react";
import { Deck } from "../functions/Deck";
import Hand from "./Hand";
import DeckArea from "./DeckArea";
import PlayerInfo from "./PlayerInfo";
//The Deck
let deck = new Deck(false);
let discardPile = new Deck();
function GameArea(props: any) {
  ////////////////////////    States    ///////////////////////////////
  //Round of play 1 indexed
  let [turn, setTurn] = useState(1);
  //Player turn in round 0 indexed
  let [playerTurn, setPlayerTurn] = useState(0);
  //The size of the pot
  let [pot, setPot] = useState(0);
  //Positions of cards to be kept
  const [holdList, setHoldList] = useState([true, true, true, true, true]);
  //Card design
  const [cardDesign, setCardDesign] = useState(0);

  ///////////////////////////////////////////////////
  // Used for development remove to separate file ///
  ///////////////////////////////////////////////////

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

  //Discards selected cards
  const continueClickEvent = () => {
    let pos = [];
    for (let i = 0; i < +holdList.length; i++) {
      if (!holdList[i]) pos.push(i);
    }
    discardAndDraw(pos);
    setHoldList([true, true, true, true, true]);
    console.log("Deck", deck.size(), "\nDiscard:", discardPile.size());
  };

  ///////////End

  const renderPlayerInfo = (player: Number) => {
    if (props.numOfPlayers >= +player) {
      return (
        <PlayerInfo player={+player} heldCash={props.heldCash[+player - 1]} />
      );
    }
  };

  //Render hand if player count is high enough
  const renderHand = (playerNumber: Number) => {
    if (playerNumber <= props.numOfPlayers) {
      if (!props.heldCards[+playerNumber - 1]) {
        return <div>Failed</div>;
      }
      return (
        <Hand
          player={+playerNumber - 1}
          hand={props.heldCards[+playerNumber - 1]}
          discardAndDraw={discardAndDraw}
          mode={props.mode}
          holdList={holdList}
          setHoldList={setHoldList}
          continueClickEvent={continueClickEvent}
          cardDesign={cardDesign}
        />
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
        <div id="designSelector"></div>
        <div id="playArea">
          <div id="leftPlayArea">
            {renderPlayerInfo(3)}
            {renderHand(3)}
          </div>
          <div id="centerPlayArea">
            <div id="centerPlayAreaTop">
              {renderPlayerInfo(2)}
              {renderHand(2)}
            </div>
            <div id="centerPlayAreaCenter">
              <DeckArea
                deck={deck}
                discardPile={discardPile}
                cardDesign={cardDesign}
                mode={props.mode}
              />
            </div>
            <div id="centerPlayAreaBottom">
              {renderPlayerInfo(1)}
              {renderHand(1)}
            </div>
          </div>
          <div id="rightPlayArea">
            {renderPlayerInfo(4)}
            {renderHand(4)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameArea;

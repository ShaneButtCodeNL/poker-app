import { useEffect, useState } from "react";

import Hand from "./Hand";
import DeckArea from "./DeckArea";
import PlayerInfo from "./PlayerInfo";
import Poker from "../functions/Poker";

function GameArea(props: any) {
  ////////////////////////    States    ///////////////////////////////
  //The Deck
  const [deck, setDeck] = useState(null);
  //The Discard Pile
  const [discardPile, setDiscardPile] = useState(null);
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
  //The game
  const [pokerGame, setPokerGame] = useState(
    () =>
      new Poker(props.minBet, props.startMoney, props.numOfPlayers, {
        setTurn: setTurn,
        setPlayerTurn: setPlayerTurn,
        setPot: setPot,
        setHoldList: setHoldList,
        setHeldCards: props.setHeldCards,
        setHeldCash: props.setHeldCash,
        setDeck: setDeck,
        setDiscardPile: setDiscardPile,
      })
  );

  //Discards selected cards
  const continueClickEvent = () => {
    let pos = [];
    for (let i = 0; i < +holdList.length; i++) {
      if (!holdList[i]) pos.push(i);
    }
    pokerGame.discardAndDraw(playerTurn, pos);
    setHoldList([true, true, true, true, true]);
    console.log("Deck", deck.size(), "\nDiscard:", discardPile.size());
  };

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
          mode={props.mode}
          holdList={holdList}
          setHoldList={setHoldList}
          continueClickEvent={continueClickEvent}
          cardDesign={cardDesign}
        />
      );
    }
  };

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

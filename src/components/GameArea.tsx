//React
import { useState } from "react";
//Components
import Hand from "./Hand";
import DeckArea from "./DeckArea";
import PlayerInfo from "./PlayerInfo";
//Functions
import Poker from "../functions/Poker";

function GameArea(props: any) {
  ////////////////////////    States    ///////////////////////////////
  //The Deck
  const [deck, setDeck] = useState(null);
  //The Discard Pile
  const [discardPile, setDiscardPile] = useState(null);
  //Round of play 0 indexed
  const [round, setRound] = useState(0);
  //Player turn in round 0 indexed
  const [playerTurn, setPlayerTurn] = useState(0);
  //The size of the pot
  const [pot, setPot] = useState(0);
  //Positions of cards to be kept
  const [holdList, setHoldList] = useState([true, true, true, true, true]);
  //Card design
  const [cardDesign, setCardDesign] = useState(0);
  //Can bet
  const [canBet, setCanBet] = useState(false);
  //Can select cards to discard
  const [canDiscard, setcanDiscard] = useState(false);
  //can start a round
  const [canStart, setCanStart] = useState(true);
  //The game
  const [pokerGame, setPokerGame] = useState(() => {
    return new Poker(props.minBet, props.startMoney, props.numOfPlayers, {
      setRound: setRound,
      setPlayerTurn: setPlayerTurn,
      setPot: setPot,
      setHoldList: setHoldList,
      setHeldCards: props.setHeldCards,
      setHeldCash: props.setHeldCash,
      setDeck: setDeck,
      setDiscardPile: setDiscardPile,
    });
  });

  const nextRound = () => {
    setRound((+round + 1) % 5);
    setCanBet(isBettingRound());
    setcanDiscard(isDiscardRound());
    setCanStart(isDrawRound());
  };

  const isDrawRound = () => {
    return round === 0;
  };

  const isDiscardRound = () => {
    return round === 2;
  };

  const isBettingRound = () => {
    return round === 1 || round === 3;
  };

  const renderDiscardButton = (player: Number) => {
    if (canDiscard) {
      if (player) return;
      return (
        <div
          className={"continueButton cardButton btn"}
          onClick={() => discardClickEvent()}
        >
          Discard
        </div>
      );
    }
  };

  //Discards selected cards and starts discard and draw phase for computer players
  const discardClickEvent = () => {
    pokerGame.discardTurn(getHoldPositions());
    setcanDiscard(false);
  };

  /**
   * Gets a 0 based list of cards to discard
   * @returns The pos of cards to be discarded
   */
  const getHoldPositions = () => {
    let hp = [...holdList];
    let discardList = [];
    setHoldList([true, true, true, true, true]);
    for (let i = 0; i < 5; i++) {
      if (!hp[i]) {
        discardList.push(i);
      }
    }
    return discardList;
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
          renderDiscardButton={renderDiscardButton}
          canDiscard={canDiscard}
          cardDesign={cardDesign}
        />
      );
    }
  };

  return (
    <div>
      <div id="playAreaContainer">
        <button onClick={() => setcanDiscard(!canDiscard)}>
          canContinue:{canDiscard ? "T" : "F"}
        </button>
        <button onClick={() => setCanBet(!canBet)}>
          canBet:{canBet ? "T" : "F"}
        </button>
        <button
          onClick={() => {
            pokerGame.discardAndDraw(0, getHoldPositions());
            console.log(
              "Deck sizes",
              pokerGame.getDeckSize(),
              pokerGame.getDiscardPileSize()
            );
          }}
        >
          test discard and draw phase
        </button>
        <button
          onClick={() => {
            pokerGame.discardTurn(getHoldPositions());
          }}
        >
          test discard and draw on human
        </button>
        <button
          onClick={() => {
            pokerGame.bettingRound(500);
          }}
        >
          Test Betting Round with $500 bet
        </button>
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
                pot={pot}
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

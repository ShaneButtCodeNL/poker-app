//React
import { useEffect, useState } from "react";
//Components
import Hand from "./Hand";
import DeckArea from "./DeckArea";
import PlayerInfo from "./PlayerInfo";
//Functions
import Poker from "../functions/Poker";
import PlayerBet from "./PlayerBet";
import GameResult from "./GameResult";
import { getName, getNames } from "../functions/NameGenerator";

function GameArea(props: any) {
  ////////////////////////    States    ///////////////////////////////
  //The Deck
  const [deck, setDeck] = useState(null);
  //The Discard Pile
  const [discardPile, setDiscardPile] = useState(null);
  //The amount of cash held by each player
  const [heldCash, setHeldCash] = useState([]);
  //The hands of cards each player has
  const [heldCards, setHeldCards] = useState([]);
  //Round of play 0 indexed
  const [round, setRound] = useState(0);
  //Player turn in round 0 indexed
  const [playerTurn, setPlayerTurn] = useState(0);
  //The size of the pot
  const [pot, setPot] = useState(0);
  //Positions of cards to be kept
  const [holdList, setHoldList] = useState([true, true, true, true, true]);
  //Can bet
  const [canBet, setCanBet] = useState(false);
  //Can select cards to discard
  const [canDiscard, setcanDiscard] = useState(false);
  //can start a round
  const [canStart, setCanStart] = useState(true);
  //The game state 1:win 0:continue -1:lose
  const [gameState, setGameState] = useState(0);
  //Player names
  const [names, setNames] = useState([
    props.name === "" ? "The One" : props.name,
    ...getNames(props.numOfPlayers - 1),
  ]);
  //Game Feed
  const [gameFeed, setGameFeed] = useState([]);
  const updateFeed = (newFeed: string) => {
    console.log("gameFeed", gameFeed);
    setGameFeed([newFeed, ...gameFeed]);
  };
  //The game
  const [pokerGame, setPokerGame] = useState(() => {
    return new Poker(
      props.minBet,
      props.startMoney,
      props.numOfPlayers,
      names,
      gameFeed,
      {
        setRound: setRound,
        setPlayerTurn: setPlayerTurn,
        setPot: setPot,
        setHoldList: setHoldList,
        setHeldCards: setHeldCards,
        setHeldCash: setHeldCash,
        setDeck: setDeck,
        setDiscardPile: setDiscardPile,
        setGameFeed: setGameFeed,
      }
    );
  });

  const restartGame = () => {
    console.log("REstarting game");
    updateFeed("New Game.");
    setGameFeed([]);
    console.log(gameFeed);
    setPokerGame(
      new Poker(
        props.minBet,
        props.startMoney,
        props.numOfPlayers,
        names,
        gameFeed,
        {
          setRound: setRound,
          setPlayerTurn: setPlayerTurn,
          setPot: setPot,
          setHoldList: setHoldList,
          setHeldCards: setHeldCards,
          setHeldCash: setHeldCash,
          setDeck: setDeck,
          setDiscardPile: setDiscardPile,
          setGameFeed: setGameFeed,
        }
      )
    );
    setRound(0);
    setGameState(0);
  };

  //Updates round
  useEffect(() => {
    setCanBet(isBettingRound());
    setCanStart(isDrawRound());
    setcanDiscard(isDiscardRound());
    if (isPayoutRound()) {
      setRound(0);
      alert(pokerGame.getGameResultString());
      pokerGame.payout(pokerGame.getWinners());
      pokerGame.reset();
      pokerGame.checkGameState().then((state) => {
        setGameState(state);
      });
    }
  }, [round]);

  const deal = async () => {
    await pokerGame.deal();
    setRound(1);
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

  const isPayoutRound = () => {
    return round === 4;
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
    const r = round + 1;
    setRound(r);
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

  const renderBettingWindow = () => {
    if (canBet) {
      return (
        <PlayerBet
          bet={async (betAmmount: Number) => {
            if (
              betAmmount !== heldCash[0] &&
              betAmmount < pokerGame.getCurrentBet(0) &&
              heldCash[0]
            ) {
              alert(`Need to bet at least $${pokerGame.getCurrentBet(0)}!!`);
              return;
            }
            await pokerGame.bettingRound(betAmmount);
            if (pokerGame.checkBets() || !heldCash[0]) {
              let r = round + 1;
              setRound(r);
              pokerGame.resetBets();
            }
          }}
          callBet={pokerGame.getCurrentBet(0)}
          playerMoney={heldCash[0]}
        />
      );
    }
  };

  const renderPlayerInfo = (player: Number) => {
    if (props.numOfPlayers >= +player) {
      return (
        <PlayerInfo
          player={+player}
          name={names[+player - 1]}
          heldCash={heldCash[+player - 1]}
        />
      );
    }
  };

  //Render hand if player count is high enough
  const renderHand = (playerNumber: Number) => {
    if (playerNumber <= props.numOfPlayers) {
      if (!heldCards[+playerNumber - 1]) {
        return <div>Failed</div>;
      }
      return (
        <Hand
          player={+playerNumber - 1}
          hand={heldCards[+playerNumber - 1]}
          mode={props.mode}
          holdList={holdList}
          setHoldList={setHoldList}
          renderDiscardButton={renderDiscardButton}
          canDiscard={canDiscard}
          frontDesign={props.frontDesign}
          backDesign={props.backDesign}
        />
      );
    }
  };

  const renderResults = (state: number) => {
    return state === 0 ? null : (
      <GameResult mode={props.mode} restartGame={restartGame} />
    );
  };

  return (
    <div id="playAreaContainer">
      {renderResults(gameState)}
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
              backDesign={props.backDesign}
              discardPile={discardPile}
              mode={props.mode}
              pot={pot}
              ante={props.minBet}
              canStart={canStart}
              deal={deal}
              setCanStart={setCanStart}
              gameFeed={gameFeed}
              updateFeed={updateFeed}
            />
          </div>
          <div id="centerPlayAreaBottom">
            {renderBettingWindow()}
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
  );
}

export default GameArea;

import { Card, Deck } from "../functions/Deck";

function GameArea(props: any) {
  let game = (
    startCash: Number,
    minBet: Number,
    numOfPlayers: Number,
    setHeldCards: Function,
    setHeldCash: Function
  ) => {
    //The Deck compriseing of one deck of standard playing cards with no jokers
    let deck = new Deck(false);
    //initial Shuffling of the deck
    for (let i = 0; i < 5; i++) {
      deck.shuffle();
    }
    //Crate hands for each player
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
  return (
    <div>
      Test Text
      <div
        onClick={() =>
          game(
            props.startMoney,
            props.minBet,
            props.numOfPlayers,
            props.setHeldCards,
            props.setHeldCash
          )
        }
      >
        Click to start simulation
      </div>
      <br />
      NumberOfPlayers:{props.numOfPlayers}
      <br />
      Starting Cash:{props.startMoney}
      <br />
      MinBet:{props.minBet}
      <br />
      Each players hand and cash: {props.heldCash[0]}
      <br />
      <ol>
        {props.heldCards.map((hand, n) => {
          return (
            <li key={n}>
              <ul>
                {hand.map((card, x) => {
                  return <li key={x}>{card.toString()}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default GameArea;

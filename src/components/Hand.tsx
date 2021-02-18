import { useState } from "react";
import Card from "./Card";

export default function Hand(props: any) {
  const [holdList, setHoldList] = useState([true, true, true, true, true]);

  //Labels player
  const player = () => {
    if (props.player === 3) return "playerFourHand";
    if (props.player === 2) return "playerThreeHand";
    if (props.player === 1) return "playerTwoHand";
    if (props.player === 0) return "playerOneHand";
  };

  /**
   * Sets the hold list when you select a card to hold/discard
   * @param cardPos The position of the card to change
   */
  const updateHoldList = (cardPos: Number) => {
    const hl = [...holdList];
    hl[+cardPos] = !hl[+cardPos];
    setHoldList(hl);
  };

  return (
    <div
      id={player()}
      className={props.player % 2 === 0 ? "horazontalHand" : "verticalHand"}
    >
      {props.player}
      {props.hand.map((card, cardPos) => {
        return (
          <Card
            player={props.player}
            card={card}
            cardPos={+cardPos}
            updateHoldList={updateHoldList}
          />
        );
      })}
    </div>
  );
}

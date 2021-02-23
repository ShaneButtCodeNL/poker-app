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

  //Makes button for confirming discard
  const continueButton = (player) => {
    if (player) return;
    return <div className={"continueButton cardButton btn"}>Continue</div>;
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
    <div id={player()} className="vFlex centerFlexAlign">
      <div
        className={
          "handZone " + (props.player <= 1 ? "horazontalHand" : "verticalHand")
        }
      >
        {props.player + 1}
        {props.hand.map((card, cardPos) => {
          return (
            <Card
              player={props.player}
              card={card}
              cardPos={+cardPos}
              updateHoldList={updateHoldList}
              mode={props.mode}
            />
          );
        })}
      </div>
      {continueButton(props.player)}
    </div>
  );
}

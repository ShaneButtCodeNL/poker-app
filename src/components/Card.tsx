import { useState } from "react";

export default function Card(props: any) {
  const [hold, setHold] = useState(true);

  const holdClickEvent = (cardPos: Number) => {
    setHold(!hold);
    props.updateHoldList(+cardPos);
  };
  function makeHold(player: Number) {
    if (+player === 0)
      return (
        <div
          className="cardButton"
          onClick={() => holdClickEvent(props.cardPos)}
        >
          {hold ? "HOLD" : "DISCARD"}
        </div>
      );
  }
  return (
    <div className="cardZone">
      <div className="card">{props.card.toString()}</div>
      {makeHold(props.player)}
    </div>
  );
}

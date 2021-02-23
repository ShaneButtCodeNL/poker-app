import { useEffect, useState } from "react";

export default function Card(props: any) {
  const [hold, setHold] = useState(true);
  //Orientation of card 0 is verticle 1 is horazontal
  const [orientation] = useState(props.player < 2 ? 0 : 1);

  const holdClickEvent = (cardPos: Number) => {
    props.updateHoldList(+cardPos);
  };

  useEffect(() => {
    setHold(props.holdList[props.cardPos]);
  }, [props.holdList, props.cardPos]);

  const cardPos = () => {
    return orientation ? "horazontalCard" : "verticalCard";
  };

  const getColor = (card) => {
    return card.getSuit() % 2 === 0
      ? props.mode === 0
        ? "cardDarkBlack"
        : "cardLightBlack"
      : props.mode === 0
      ? "cardDarkRed"
      : "cardLightRed";
  };
  const cardClass = (card) => {
    return (
      (props.mode === 0 ? "cardDark " : "cardLight ") +
      getColor(card) +
      " " +
      cardPos()
    );
  };
  function makeHold(player: Number) {
    if (+player === 0)
      return (
        <div
          className="cardButton btn"
          onClick={() => holdClickEvent(props.cardPos)}
        >
          {hold ? "HOLD" : "DISCARD"}
        </div>
      );
  }
  return (
    <div className="cardZone">
      <div className={cardClass(props.card)}>{props.card.toString()}</div>
      {makeHold(props.player)}
    </div>
  );
}

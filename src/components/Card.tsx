import { useEffect, useState } from "react";
import { renderFace, renderBack } from "../functions/RenderCardFace";

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

  function renderCard() {
    if (props.cardDesign) {
      const cardLocation = props.player
        ? renderBack(props.design)
        : renderFace(props.card, props.design);
      return (
        <div>
          <img src={cardLocation}></img>
        </div>
      );
    } else {
      if (!props.player) {
        return (
          <div className={cardClass(props.card)}>{props.card.toString()}</div>
        );
      } else {
        return (
          <div
            className={
              cardClass(props.card) +
              (props.mode ? " plainCardBackLight" : " plainCardBackDark")
            }
          ></div>
        );
      }
    }
  }

  return (
    <div className="cardZone">
      {renderCard()}
      {makeHold(props.player)}
    </div>
  );
}

import { useEffect, useState } from "react";
import { renderFace, renderBack } from "../functions/RenderCardFace";
import { Card as ACard } from "../functions/Deck";
import DisplayCard from "./DisplayCard";

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

  const getColor = (card: ACard) => {
    return card.getSuit() % 2 === 0
      ? props.mode === 0
        ? "cardDarkBlack"
        : "cardLightBlack"
      : props.mode === 0
      ? "cardDarkRed"
      : "cardLightRed";
  };
  const cardClass = (card: ACard) => {
    return (
      (props.mode === 0 ? "cardDark " : "cardLight ") +
      getColor(card) +
      " " +
      cardPos()
    );
  };
  function makeHold(player: Number) {
    if (+player === 0)
      return props.canDiscard ? (
        <div
          className={`holdBtn ${hold ? "keep" : "notKeep"}Btn cardButton btn`}
          onClick={() => holdClickEvent(props.cardPos)}
        >
          {hold ? "HOLD" : "DISCARD"}
        </div>
      ) : (
        <div></div>
      );
  }
  const getRotation = (player: number) => {
    if (player === 0) return;
    if (player === 1) return 180;
    if (player === 2) return 90;
    return 270;
  };
  const renderCard = (
    player: number,
    mode: number,
    card: ACard,
    frontDesign: number,
    backDesign: number
  ) => {
    return (
      <DisplayCard
        player={player}
        rotation={getRotation(player)}
        mode={mode}
        card={card}
        frontDesign={frontDesign}
        backDesign={backDesign}
      />
    );
  };

  return (
    <div className="cardZone">
      {makeHold(props.player)}
      {renderCard(
        props.player,
        props.mode,
        props.card,
        props.frontDesign,
        props.backDesign
      )}
    </div>
  );
}

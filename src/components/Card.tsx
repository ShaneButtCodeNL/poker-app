import { useEffect, useState } from "react";
import { Card as ACard } from "../functions/Deck";
import DisplayCard from "./DisplayCard";

export default function Card(props: any) {
  const [hold, setHold] = useState(true);

  const holdClickEvent = (cardPos: Number) => {
    props.updateHoldList(+cardPos);
  };

  useEffect(() => {
    setHold(props.holdList[props.cardPos]);
  }, [props.holdList, props.cardPos]);

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

  const renderBorder = (
    player: number,
    mode: number,
    card: ACard,
    frontDesign: number,
    backDesign: number,
    keep: boolean
  ) => {
    if (player) return renderCard(player, mode, card, frontDesign, backDesign);
    return (
      <fieldset
        className="cardFieldset"
        onClick={() => holdClickEvent(props.cardPos)}
      >
        <legend className="cardLegend">{keep ? "HOLD" : "TOSS"}</legend>
        {renderCard(player, mode, card, frontDesign, backDesign)}
      </fieldset>
    );
  };

  return (
    <div className={`cardZone`}>
      {renderBorder(
        props.player,
        props.mode,
        props.card,
        props.frontDesign,
        props.backDesign,
        hold
      )}
    </div>
  );
}

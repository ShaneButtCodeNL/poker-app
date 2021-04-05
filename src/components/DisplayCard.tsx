import { useState } from "react";
import { Card } from "../functions/Deck";
import { renderFace, renderBack } from "../functions/RenderCardFace";

export default function DisplayCard(props: any) {
  const [rotation, setRotation] = useState(props.rotation);

  const imgClassName = (player: number) => {
    const className = `cardImage${player <= 1 ? "Verticle" : "Horazontal"} `;
    return className;
  };

  const renderCard = (
    frontDesign: number,
    backDesign: number,
    card: Card,
    player: number
  ) => {
    return (
      <img
        src={
          player
            ? renderBack(backDesign, rotation)
            : renderFace(card, frontDesign)
        }
        className={imgClassName(player)}
      />
    );
  };
  return (
    <>
      {renderCard(
        props.frontDesign,
        props.backDesign,
        props.card,
        props.player
      )}
    </>
  );
}

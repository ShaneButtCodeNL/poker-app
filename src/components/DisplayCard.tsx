import { useState } from "react";
import { Card } from "../functions/Deck";
import { renderFace, renderBack } from "../functions/RenderCardFace";

export default function DisplayCard(props: any) {
  const [rotation, setRotation] = useState(props.rotation);

  /**
   * Applies rotation on an element
   * @param rotation The amount of rotation
   * @returns a classname for the css rotation
   */
  const getRotation = (rotation: number) => {
    if (rotation === 90) return " rotate90 ";
    if (rotation === 180) return " rotate180 ";
    if (rotation === 270) return " rotate270 ";
    return "";
  };

  /**
   * Gets the classname for the container of a card
   * @param rotation The ammount of rotation
   * @returns card container class name
   */
  const divClass = (rotation: number) => {
    let className = "cardContainer ";
    className = className + getRotation(rotation);
    return className;
  };

  const imgClassName = () => {
    const className = " cardImage ";
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
        src={player ? renderBack(backDesign) : renderFace(card, frontDesign)}
        className={imgClassName()}
      />
    );
  };
  return (
    <div className={divClass(rotation)}>
      {renderCard(
        props.frontDesign,
        props.backDesign,
        props.card,
        props.player
      )}
    </div>
  );
}

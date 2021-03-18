import { renderBack, renderFace } from "../functions/RenderCardFace";
import { Card, Suits, Values } from "../functions/Deck";
import { useSpring, animated, config } from "react-spring";
import { useState } from "react";

export default function DesignSelect(props: any) {
  //Div is collapsed
  const [collapsed, setCollapsed] = useState(false);
  // Collapse/Expand div
  const slide = useSpring({
    config: config.default,
    from: { opacity: 0, height: "0vh", overflow: "hidden" },
    to: {
      opacity: collapsed ? 0 : 1,
      height: collapsed ? "0vh" : "30vh",
      overflow: "auto",
    },
  });
  //Just a default card to show card front
  const card = new Card(Suits.Spades, Values.Ace);

  //Click Event to Collapse/Expand the animated div
  const clickCollapse = () => {
    setCollapsed(!collapsed);
  };
  //Gets a class for card to reflect mode
  const cardId = (front: boolean, mode: number) => {
    const m = mode ? "Light" : "Dark";
    const f = front ? "Front" : "Back";
    return "plainCard" + f + m + " card" + m + "Black card" + m;
  };
  /**
   * Renders a card image
   * @param src Image source location
   * @param front is this the front of the card
   * @returns a react component containg an image representation of the card
   */
  const renderImage = (src: string, front: boolean) => {
    return (
      <div>
        {src === "default" ? (
          <div className={cardId(front, props.mode) + " imagePreview"}>
            {front ? card.toString() : ""}
          </div>
        ) : (
          <i />
        )}
      </div>
    );
  };
  return (
    <div id="designSelectContainer">
      <animated.div
        id="aniDesignSelect"
        className="vFlex centerFlexAlign"
        style={slide}
      >
        <label>Select a card design below:</label>
        <br />
        <div id="cardBackDesignSelect" className="hFlex centerFlexAlign">
          {renderImage(renderBack(props.backDesign), false)}
          <label>Select a design for card backs:</label>
        </div>
        <div id="cardFrontDesignSelect" className="hFlex centerFlexAlign">
          {renderImage(renderFace(card, props.frontDesign), true)}
          <label>Select a design for card faces:</label>
        </div>
      </animated.div>
      <button
        onClick={() => {
          clickCollapse();
        }}
      >
        {collapsed ? "Expand" : "Collapse"}
      </button>
    </div>
  );
}

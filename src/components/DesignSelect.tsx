import { renderBack, renderFace } from "../functions/RenderCardFace";
import { Card, Suits, Values } from "../functions/Deck";
import { useSpring, animated, config } from "react-spring";
import { useRef, useState } from "react";
import PreviewCardImage from "./PreviewCardImage";
//import pokerHands from "../images/pokerHands.png";

export default function DesignSelect(props: any) {
  //Div is collapsed
  const [collapsed, setCollapsed] = useState(false);
  const backDesignRef = useRef(null);
  const frontDesignRef = useRef(null);
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

  const changeBackDesign = (design: number) => {
    props.setBackDesign(design);
  };
  const changeFrontDesign = (design: number) => {
    props.setFrontDesign(design);
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
        {!src ? (
          <div className={cardId(front, props.mode) + " imagePreview"}>
            {front ? card.toString() : ""}
          </div>
        ) : (
          <PreviewCardImage src={src} />
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
          <div>
            <label>Select a design for card backs:</label>
            <select
              id="backDesignSelect"
              ref={backDesignRef}
              defaultValue="0"
              onChange={() => {
                changeBackDesign(parseInt(backDesignRef.current.value));
                console.log(
                  renderBack(props.backDesign),
                  backDesignRef.current.value
                );
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div id="cardFrontDesignSelect" className="hFlex centerFlexAlign">
          {renderImage(renderFace(card, props.frontDesign), true)}
          <label>Select a design for card faces:</label>
          <select
            id="frontDesignSelect"
            ref={frontDesignRef}
            defaultValue="0"
            onChange={() => {
              changeFrontDesign(parseInt(frontDesignRef.current.value));
              console.log(
                renderFace(card, props.backDesign),
                frontDesignRef.current.value
              );
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
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

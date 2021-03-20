import { Card } from "./Deck";
//cards saved as ./Cards/design2/HeartsTen.png for design 2 ten of hearts
//cards saved as ./Cards/design1/Back.png for design 1 back of the card
const cardFolder = "/images/Cards/design";
const fileEnd = ".png";
const defaultString = "default";

//Will render the card front
const renderFace = (card: Card, design: Number) => {
  if (!design) return null;
  return (
    cardFolder +
    +design +
    "/" +
    card.suitToString() +
    card.valueToString() +
    fileEnd
  );
};

//Will render the back of a card
const renderBack = (design: Number) => {
  if (!design) return null;
  return cardFolder + +design + "/Back" + fileEnd;
};

export { renderFace, renderBack };

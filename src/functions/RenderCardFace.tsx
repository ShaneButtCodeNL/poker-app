import { Card } from "./Deck";
//cards saved as ./Cards/design2HeartsTen.jpg for design 2 ten of hearts
//cards saved as ./Cards/design1Back.jpg for design 1 back of the card
const cardFolder = "./Cards/design";
const fileEnd = ".jpg";

//Will render the card front
const renderFace = (card: Card, design: Number) => {
  if (!design) return;
  return (
    cardFolder + +design + card.valueToString() + card.suitToString() + fileEnd
  );
};

//Will render the back of a card
const renderBack = (design: Number) => {
  if (!design) return;
  return cardFolder + +design + "Back" + fileEnd;
};

export { renderFace, renderBack };

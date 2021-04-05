import { Card } from "./Deck";
//cards saved as ./Cards/design2/HeartsTen.png for design 2 ten of hearts
//cards saved as ./Cards/design1/Back.png for design 1 back of the card
const cardFolder = "/images/Cards/";
const fileEnd = ".png";

//Will render the card front
const renderFace = (card: Card, design: Number) => {
  if (!design) return null;
  return `${cardFolder}/face/design${design}/${card.suitToString()}${card.valueToString()}${fileEnd}`;
};

//Will render the back of a card
const renderBack = (design: Number, rotation?: number) => {
  if (!design) return null;
  return `${cardFolder}/back/Back${design}${
    rotation ? `rotate${rotation}` : ""
  }${fileEnd}`;
};

export { renderFace, renderBack };

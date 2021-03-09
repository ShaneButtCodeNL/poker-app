import { Deck } from "../functions/Deck";
import { renderBack } from "../functions/RenderCardFace";

export default function DeckArea(props: any) {
  const renderDeckImage = () => {
    if (props.cardDesign) {
      const cardStyle = renderBack(props.cardDesign);
    } else {
      return (
        <div
          className={
            (props.mode === 0 ? "cardDark " : "cardLight ") +
            " verticalCard " +
            (props.mode ? " plainCardBackLight" : " plainCardBackDark")
          }
        ></div>
      );
    }
  };
  const renderDeck = () => {
    if (props.deck.size()) return renderDeckImage();
    else return <div className="verticalCard plainCardBackBlank"></div>;
  };
  const renderDiscard = () => {
    if (props.discardPile.size()) return renderDeckImage();
    else return <div className="verticalCard plainCardBackBlank"></div>;
  };

  return (
    <div id="deckArea">
      <div id="deckPile" className="deckPosition">
        {renderDeck()}
      </div>
      <div id="potInfo">
        POT:
        <br />${props.pot}
      </div>
      <div id="discardPile" className="deckPosition">
        {renderDiscard()}
      </div>
    </div>
  );
}

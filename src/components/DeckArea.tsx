import DisplayCard from "./DisplayCard";
import { Card } from "../functions/Deck";

export default function DeckArea(props: any) {
  const card = new Card(1, 1);
  const renderDeckImage = (
    player: number,
    mode: number,
    card: Card,
    backDesign: number
  ) => {
    return (
      <DisplayCard
        player={player}
        mode={mode}
        card={card}
        backDesign={backDesign}
      />
    );
  };
  const renderDeck = (
    player: number,
    mode: number,
    card: Card,
    backDesign: number
  ) => {
    if (props.deck.size())
      return renderDeckImage(player, mode, card, backDesign);
    return;
  };
  const renderDiscard = (
    player: number,
    mode: number,
    card: Card,
    backDesign: number
  ) => {
    if (props.discardPile.size())
      return renderDeckImage(player, mode, card, backDesign);
    return;
  };

  return (
    <div id="deckArea">
      <div id="deckPile" className="deckPosition">
        {renderDeck(1, props.mode, card, props.backDesign)}
      </div>
      <div>
        {props.canStart ? (
          <div
            id="canStartBtn"
            className="btn cardButton"
            onClick={() => {
              props.deal();
              props.setCanStart(false);
            }}
          >
            Ante: ${props.ante}
          </div>
        ) : (
          <div id="potInfo">
            POT:
            <br />${props.pot}
          </div>
        )}
      </div>
      <div id="discardPile" className="deckPosition">
        {renderDiscard(1, props.mode, card, props.backDesign)}
      </div>
    </div>
  );
}

import Card from "./Card";

export default function Hand(props: any) {
  //Labels player
  const player = () => {
    if (props.player === 3) return "playerFourHand";
    if (props.player === 2) return "playerThreeHand";
    if (props.player === 1) return "playerTwoHand";
    if (props.player === 0) return "playerOneHand";
  };

  /**
   * Sets the hold list when you select a card to hold/discard
   * @param cardPos The position of the card to change
   */
  const updateHoldList = (cardPos: Number) => {
    const hl = [...props.holdList];
    hl[+cardPos] = !hl[+cardPos];
    props.setHoldList(hl);
  };

  return (
    <div
      id={player()}
      style={{}}
      className={`vFlex centerFlexAlign hand ${
        props.player <= 1 ? "horazontalHand" : "verticalHand"
      }`}
    >
      {props.renderDiscardButton(props.player)}
      <div className={props.player < 2 ? "horazontalHand" : "verticleHand"}>
        {props.hand.map((card, cardPos) => {
          return (
            <Card
              key={props.player * 10 + cardPos}
              player={props.player}
              card={card}
              cardPos={+cardPos}
              holdList={props.holdList}
              updateHoldList={updateHoldList}
              mode={props.mode}
              frontDesign={props.frontDesign}
              backDesign={props.backDesign}
              canDiscard={props.canDiscard}
            />
          );
        })}
      </div>
    </div>
  );
}

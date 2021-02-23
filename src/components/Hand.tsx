import Card from "./Card";

export default function Hand(props: any) {
  //Labels player
  const player = () => {
    if (props.player === 3) return "playerFourHand";
    if (props.player === 2) return "playerThreeHand";
    if (props.player === 1) return "playerTwoHand";
    if (props.player === 0) return "playerOneHand";
  };

  //Makes button for confirming discard
  const continueButton = (player) => {
    if (player) return;
    return (
      <div
        className={"continueButton cardButton btn"}
        onClick={() => props.continueClickEvent()}
      >
        Continue
      </div>
    );
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
    <div id={player()} className="vFlex centerFlexAlign">
      {continueButton(props.player)}
      <div
        className={
          "handZone " + (props.player <= 1 ? "horazontalHand" : "verticalHand")
        }
      >
        {props.player + 1}
        {props.hand.map((card, cardPos) => {
          return (
            <Card
              player={props.player}
              card={card}
              cardPos={+cardPos}
              holdList={props.holdList}
              updateHoldList={updateHoldList}
              mode={props.mode}
            />
          );
        })}
      </div>
    </div>
  );
}

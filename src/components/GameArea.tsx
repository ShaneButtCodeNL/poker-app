import react from "react";

function GameArea(props: any) {
  return (
    <div>
      Test Text
      <br />
      NumberOfPlayers:{props.numOfPlayers}
      <br />
      Starting Cash:{props.startMoney}
      <br />
      MinBet:{props.minBet}
    </div>
  );
}

export default GameArea;

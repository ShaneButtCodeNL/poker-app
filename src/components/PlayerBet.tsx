import { useRef } from "react";

export default function PlayerBet(props: any) {
  const raiseRef = useRef(null);
  return (
    <div id="playerBetContainer">
      <span>Bet</span>
      <br />
      <button
        onClick={() => {
          props.bet(props.callBet);
        }}
      >
        ${props.callBet} TO CALL
      </button>
      <br />
      <input
        type="number"
        defaultValue={props.currentBet}
        ref={raiseRef}
      ></input>
      <button
        onClick={() => {
          props.bet(raiseRef.current.value);
        }}
      >
        Raise
      </button>
    </div>
  );
}

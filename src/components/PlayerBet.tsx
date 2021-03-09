import { useRef } from "react";

export default function PlayerBet(props: any) {
  const raiseRef = useRef(null);
  return (
    <div id="playerBetContainer">
      <span>Bet</span>
      <br />
      <button
        onClick={() => {
          props.pokerGame.call(0);
        }}
      >
        CALL
      </button>
      <br />
      <input
        type="number"
        defaultValue={props.currentBet}
        ref={raiseRef}
      ></input>
      <button
        onClick={() => {
          props.pokerGame.raise(0, +raiseRef.current.value);
        }}
      >
        Raise
      </button>
    </div>
  );
}

import { useRef } from "react";

export default function PlayerBet(props: any) {
  const raiseRef = useRef(null);
  return !props.playerMoney ? (
    <div id="playerBetContainer">
      <button
        onClick={() => {
          props.bet(0);
        }}
      >
        Continue.
      </button>
    </div>
  ) : (
    <div id="playerBetContainer" style={{ margin: ".6em" }}>
      <span>Bet</span>
      <br />
      <button
        className={`${props.mode ? "light" : "dark"}Btn btn`}
        style={{ minWidth: "60%", marginBottom: ".4em" }}
        onClick={() => {
          props.bet(
            props.playerMoney <= props.callBet
              ? props.playerMoney
              : props.callBet
          );
        }}
      >
        {props.playerMoney <= props.callBet
          ? `ALL IN`
          : `$${props.callBet} TO CALL`}
      </button>
      <br />
      <div className="centerFlexAlign">
        <input
          type="number"
          defaultValue={props.currentBet}
          ref={raiseRef}
          disabled={props.playerMoney <= props.callBet}
        ></input>
        <button
          className={`${props.mode ? "light" : "dark"}Btn btn`}
          disabled={props.playerMoney <= props.callBet}
          style={{ whiteSpace: "pre-wrap", marginLeft: ".5em" }}
          onClick={() => {
            props.bet(raiseRef.current.value);
          }}
        >
          {props.playerMoney > props.callBet ? "Raise" : "Cannot\nRaise"}
        </button>
      </div>
    </div>
  );
}

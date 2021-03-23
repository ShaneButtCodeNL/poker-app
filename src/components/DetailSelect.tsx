/**
 * This component will take details for the game such as number of players, starting cash and min bet
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DetailSelect(props: any) {
  const getCanStart = () => {
    return props.minBet <= props.startMoney;
  };
  let startMoneyRef: any = React.createRef();
  let numberOfPlayersRef: any = React.createRef();
  let minBetRef: any = React.createRef();
  const [canStart, setCanStart] = useState(getCanStart());

  useEffect(() => {
    setCanStart(getCanStart());
  }, [props.startMoney, props.minBet]);

  return (
    <div id="detailSelect">
      <div id="detailsInputBox">
        <div className="detailInput">
          <label>Select number of players:</label>
          <select
            id="numberOfPlayers"
            ref={numberOfPlayersRef}
            defaultValue={props.numOfPlayers}
            onChange={() => {
              props.setNumOfPlayers(+numberOfPlayersRef.current.value);
            }}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="detailInput">
          <label>Amount of money to start with:&nbsp;&nbsp;</label>
          <input
            id="startMoney"
            ref={startMoneyRef}
            onChange={() => {
              props.setStartMoney(+startMoneyRef.current.value);
            }}
            type="number"
            max="1000000"
            min="5000"
            defaultValue={+props.startMoney}
          ></input>
        </div>
        <div className="detailInput">
          <label>Set Minimum Bet</label>
          <input
            id="minBet"
            ref={minBetRef}
            onChange={() => {
              props.setMinBet(+minBetRef.current.value);
            }}
            type="number"
            min="100"
            max="100000"
            defaultValue={+props.minBet}
          ></input>
        </div>
      </div>
      <br />
      {canStart ? (
        <Link to="/poker" className={props.mode ? "lightLink" : "darkLink"}>
          <div
            id="startGameLink"
            className={props.mode ? "lightLinkDiv" : "darkLinkDiv"}
          >
            Start
            <br />
            The
            <br />
            Game
          </div>
        </Link>
      ) : (
        <div className={`block ${props.mode ? "light" : "dark"}Block`}>
          <span
            style={{
              fontWeight: 700,
              textDecoration: "underline",
              color: "red",
            }}
          >
            !!! INVALID ENTRY !!!
          </span>
          <br />
          Minimum bet cannot exceed
          <br />
          starting ammount of money
        </div>
      )}
    </div>
  );
}

export default DetailSelect;

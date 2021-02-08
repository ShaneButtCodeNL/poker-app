/**
 * This component will take details for the game such as number of players, starting cash and min bet
 */
import React from "react";
import { Link } from "react-router-dom";

function DetailSelect(props: any) {
  let startMoneyRef: any = React.createRef();
  let numberOfPlayersRef: any = React.createRef();
  let minBetRef: any = React.createRef();

  return (
    <div>
      <form>
        <div>
          <label>Select number of players:</label>
          <select
            id="numberOfPlayers"
            ref={numberOfPlayersRef}
            onChange={() =>
              props.setNumOfPlayers(+numberOfPlayersRef.current.value)
            }
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <br />
          <label>Amount of money to start with:</label>
          <input
            id="startMoney"
            ref={startMoneyRef}
            onChange={() => {
              props.setStartMoney(+startMoneyRef.current.value);
            }}
            type="number"
            max="1000000"
            min="5000"
            defaultValue="5000"
          ></input>
          <br />
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
            defaultValue="100"
          ></input>
        </div>
        <Link to="/poker">
          <label
            id="startGame"
            onClick={() => {
              props.test();
            }}
          >
            Start
            <br />
            The
            <br />
            Game
          </label>
        </Link>
      </form>
    </div>
  );
}

export default DetailSelect;

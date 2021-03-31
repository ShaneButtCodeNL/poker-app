/**
 * This component will take details for the game such as number of players, starting cash and min bet
 */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Block from "./Block";

function DetailSelect(props: any) {
  const [startStyle, setStartStyle] = useState({});
  const getErrorMessage = () => {
    if (props.minBet < 0) return 1;
    if (props.startMoney <= 0) return 2;
    if (props.minBet > props.startMoney) return 3;
    return null;
  };
  let startMoneyRef: any = React.createRef();
  let numberOfPlayersRef: any = React.createRef();
  let minBetRef: any = React.createRef();
  let nameRef = useRef(null);
  const [canStart, setCanStart] = useState(getErrorMessage() === null);
  const [errorState, setErrorState] = useState(getErrorMessage());

  useEffect(() => {
    setCanStart(getErrorMessage() === null);
    setErrorState(getErrorMessage());
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
            defaultValue={+props.minBet}
          ></input>
        </div>
        <div className="detailInput">
          <label htmlFor="name">Enter Name</label>
          <input
            id="nameInput"
            ref={nameRef}
            type="text"
            defaultValue="The One"
            onChange={() => props.setName(nameRef.current.value)}
          ></input>
        </div>
        <label htmlFor="presets">
          <span style={{ paddingLeft: ".3em" }}>Presets:</span>
          <br />
          <div
            id="presetsDiv"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <button
              className="presetBtn"
              onClick={() => {
                startMoneyRef.current.value = 10_000_000;
                minBetRef.current.value = 2_500_000;
                props.setStartMoney(10000000);
                props.setMinBet(2500000);
              }}
            >
              High Stakes
            </button>
            <button
              className="presetBtn"
              onClick={() => {
                startMoneyRef.current.value = 1_000;
                minBetRef.current.value = 100;
                props.setStartMoney(1000);
                props.setMinBet(100);
              }}
            >
              Low Stakes
            </button>
            <button
              className="presetBtn"
              onClick={() => {
                startMoneyRef.current.value = 10_000;
                minBetRef.current.value = 5;
                props.setStartMoney(10000);
                props.setMinBet(5);
              }}
            >
              Maybe try the slots
            </button>
            <button
              className="presetBtn"
              onClick={() => {
                startMoneyRef.current.value = 1_000_000;
                minBetRef.current.value = 1_000_000;
                props.setStartMoney(1000000);
                props.setMinBet(1000000);
              }}
            >
              ALL OR NOTHING
            </button>
          </div>
        </label>
      </div>
      <br />
      {canStart ? (
        <Link to="/poker" className={props.mode ? "lightLink" : "darkLink"}>
          <div
            id="startGameLink"
            className={props.mode ? "lightLinkDiv" : "darkLinkDiv"}
            style={startStyle}
            onMouseDown={() => {
              setStartStyle({ borderStyle: "inset" });
            }}
            onMouseUp={() => {
              setStartStyle({});
            }}
            onMouseLeave={() => {
              setStartStyle({});
            }}
          >
            Start
            <br />
            The
            <br />
            Game
          </div>
        </Link>
      ) : (
        <Block mode={props.mode} code={errorState} />
      )}
      <br />
      {props.minBet === 0 ? (
        <div
          style={{
            whiteSpace: "pre-wrap",
            textAlign: "center",
            padding: "0.5em",
            margin: ".7em",
            borderStyle: "solid",
          }}
        >
          {
            " Warning minimum bet is zero.\nThis means no cost to ante\nand can lead to zero dollar pots"
          }
        </div>
      ) : null}
    </div>
  );
}

export default DetailSelect;

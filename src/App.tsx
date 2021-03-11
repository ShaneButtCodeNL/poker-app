/**
 * Will play a game of poker against NPCs with a set of rules
 */

import { Header } from "./components/Header";
import DetailSelect from "./components/DetailSelect";
import GameArea from "./components/GameArea";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

function App() {
  ///////////          States            //////////////////////
  //
  //The Amount of money players will start with
  let [startMoney, setStartMoney] = useState(5000);
  //
  //The minimum bet needed to bid on a hand
  let [minBet, setMinBet] = useState(100);
  //
  //The number of players 1 human rest cpu
  let [numOfPlayers, setNumOfPlayers] = useState(2);
  //
  //The visual style of the app for now just light and dark
  let [mode, setMode] = useState(0);
  //

  let appClass = "App " + (mode ? "lightMode" : "darkMode");
  return (
    <div className={appClass}>
      <Header mode={mode} setMode={setMode} />
      <Router>
        <Switch>
          <Route path="/poker">
            <GameArea
              startMoney={startMoney}
              minBet={minBet}
              numOfPlayers={numOfPlayers}
              mode={mode}
            />
          </Route>
          <Route path="/" exact>
            <DetailSelect
              startMoney={startMoney}
              minBet={minBet}
              numOfPlayers={numOfPlayers}
              setStartMoney={setStartMoney}
              setNumOfPlayers={setNumOfPlayers}
              setMinBet={setMinBet}
              mode={mode}
              test={() =>
                console.log(
                  "Start Money:",
                  startMoney,
                  "MinBet:",
                  minBet,
                  "NumOfPlayers",
                  numOfPlayers
                )
              }
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

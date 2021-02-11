/**
 * Will play a game of poker against NPCs with a set of rules
 */

import { Header } from "./components/Header";
import DetailSelect from "./components/DetailSelect";
import GameArea from "./components/GameArea";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

enum MODES {
  dark = 0,
  medium,
  light,
}

function App() {
  let [startMoney, setStartMoney] = useState(5000);
  let [minBet, setMinBet] = useState(100);
  let [numOfPlayers, setNumOfPlayers] = useState(2);
  let [mode, setMode] = useState(0);
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

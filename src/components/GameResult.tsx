import { Link } from "react-router-dom";

export default function GameResult(props: any) {
  return (
    <div
      id="gameResultDiv"
      className={props.mode ? "lightTransBG" : "darkTransBG"}
    >
      <div
        className={props.mode ? "lightMode" : "darkMode"}
        style={{
          padding: "2em",
          borderStyle: "solid",
          border: "2px",
          borderColor: props.mode ? "black" : "white",
        }}
      >
        Test Text
        <button
          onClick={() => {
            props.restartGame();
          }}
        >
          Play Again?
        </button>
        <Link to="/">
          <button>Return to selection screen?</button>
        </Link>
      </div>
    </div>
  );
}

import GameFeed from "./GameFeed";

export default function DeckArea(props: any) {
  return (
    <div id="deckArea">
      <div style={{ textAlign: "center" }}>
        {props.canStart ? (
          <button
            id="canStartBtn"
            className={`btn ${props.mode ? "light" : "dark"}Btn`}
            onClick={() => {
              props.deal();
              props.setCanStart(false);
            }}
            style={{ minWidth: "60%", lineHeight: "2em" }}
          >
            Ante: ${props.ante}
          </button>
        ) : (
          <div id="potInfo">
            POT:
            <br />${props.pot}
          </div>
        )}
        <GameFeed gameFeed={props.gameFeed} />
      </div>
    </div>
  );
}

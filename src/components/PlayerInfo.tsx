export default function PlayerInfo(props: any) {
  const getPlayerId = (player: Number) => {
    return "player" + +player;
  };
  return (
    <div id={getPlayerId(props.player) + "Details"} className="playerInfoBox">
      <span id={getPlayerId(props.player) + "Name"}>{props.name}</span>
      <br />
      <span id={getPlayerId(props.player) + "Money"}>
        Money:{props.heldCash}
      </span>
    </div>
  );
}

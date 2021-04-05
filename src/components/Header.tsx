import ModeSelector from "./ModeSelector";

function Header(props: any) {
  return (
    <header>
      <button
        className={`btn ${props.mode ? "light" : "dark"}Btn`}
        onClick={() => {
          props.setShowPokerGuide(true);
        }}
      >
        Show
        <br />
        Hands
      </button>
      <div>
        <span id="title">Let's Play Poker</span>
      </div>
      <div>
        <ModeSelector mode={props.mode} setMode={props.setMode} />
      </div>
    </header>
  );
}

export { Header };

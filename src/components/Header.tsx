import ModeSelector from "./ModeSelector";

function Header(props: any) {
  return (
    <header>
      <div>
        <span id="title">Let's Play Poker</span>
        <br />
      </div>
      <div>
        <ModeSelector mode={props.mode} setMode={props.setMode} />
      </div>
    </header>
  );
}

export { Header };

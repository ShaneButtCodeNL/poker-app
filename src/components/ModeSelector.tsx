function ModeSelector(props: any) {
  let className =
    "modeSelectorDiv " + (props.mode ? "lightModeBtn" : "darkModeBtn");
  return (
    <div
      className={className + " btn"}
      onClick={() => props.setMode(props.mode ? 0 : 1)}
    >
      {props.mode ? "Light Mode" : "Dark  Mode"}
    </div>
  );
}

export default ModeSelector;

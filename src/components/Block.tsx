export default function Block(props: any) {
  const getErrorMessage = (code: number) => {
    if (code === 1) return "Minimum bet\nMust be greater or equal to\nZero.";
    if (code === 2) return "Starting money\nMust be greater than\nZero.";
    if (code === 3)
      return "Minimum bet\nMust be less than or equal to\nStarting cash.";
  };
  return (
    <div className={`block ${props.mode ? "light" : "dark"}Block`}>
      <span
        style={{
          fontWeight: 700,
          textDecoration: "underline",
          color: "red",
        }}
      >
        !!!INVALID ENTRY!!!
      </span>
      <br />
      <span style={{ whiteSpace: "pre-wrap" }}>
        {getErrorMessage(props.code)}
      </span>
    </div>
  );
}

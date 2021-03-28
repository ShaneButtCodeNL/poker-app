export default function PreviewCardImage(props) {
  return (
    <img
      className="imagePreview"
      src={process.env.PUBLIC_URL + props.src}
      alt="Image of a card"
    />
  );
}

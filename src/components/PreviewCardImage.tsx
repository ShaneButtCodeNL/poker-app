import { useState } from "react";
import back from "../images/Cards/design1/Back.png";
export default function PreviewCardImage(props) {
  return (
    <img
      className="imagePreview"
      src={process.env.PUBLIC_URL + props.src}
      alt="Image of a card"
    />
  );
}

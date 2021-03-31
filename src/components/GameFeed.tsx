import { useEffect, useState } from "react";

export default function GameFeed(props: any) {
  let listItems = props.gameFeed.map((v: string, i: number) => {
    return (
      <li className="feedItem" key={i}>
        {v}
      </li>
    );
  });
  return <ul id="gameFeed">{listItems}</ul>;
}

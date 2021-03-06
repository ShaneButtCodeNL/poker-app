import { RandomWholeNumber as rand } from "./RandomNumber";

export async function BadPokerCards() {
  let positions = [];
  let r = new rand();
  r.setMax(2);
  r.setMin(1);
  for (let i = 0; i < 5; i++) {
    positions.push(+r.next === 1);
  }
  return positions;
}

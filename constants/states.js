export const WISH_LIST = "Wish List";
export const TO_TRY = "Try Next";
export const BACKLOG = "Backlog";
export const NEXT_UP = "Next Up";
export const PLAYING = "Playing";
export const COMPLETED = "Completed";
export const SHELVED = "Shelved";
export const ABANDONED = "Abandoned";
export const OTHER = "Other";
export const PLAYED = "Played";
export const TO_CONSIDER = "To Consider";

const states = [
  WISH_LIST,
  TO_TRY,
  BACKLOG,
  PLAYING,
  COMPLETED,
  PLAYED,
  TO_CONSIDER,
];

const evalState = {
  [WISH_LIST]: (x) => (!x.ownedAs && !x.toConsider) || x.wanted,
  [TO_TRY]: (x) => !x.played && x.ownedAs && !x.backlog,
  [BACKLOG]: (x) => x.backlog,
  [PLAYING]: (x) => x.playing,
  [COMPLETED]: (x) => x.completed,
  [PLAYED]: (x) => x.played,
  [TO_CONSIDER]: (x) => x.toConsider,
};

export const isInState = (game, state) => evalState[state](game);

export default states;

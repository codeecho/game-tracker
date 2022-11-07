import { createContext, useContext, useState } from 'react';

const savedState = (() => {
  if (typeof window === 'undefined') return;
  const savedState = localStorage.getItem('backlog');
  if (savedState) return JSON.parse(savedState);
})();

const backlogContext = createContext();

export const useBacklog = () => useContext(backlogContext);

export default function BacklogProvider({ children }) {
  const newState = {
    games: [],
  };

  const [state, setState] = useState(savedState || newState);

  const updateState = (state) => {
    setState(state);
    localStorage.setItem('backlog', JSON.stringify(state));
  };

  const add = (game, status) => {
    if (state.games.find((x) => x.id === game.id)) return;
    updateState({ ...state, games: state.games.concat({ ...game, status }) });
  };

  const get = (id) => state.games.find((x) => x.id === id);

  const update = (game) =>
    updateState({
      ...state,
      games: state.games.map((x) => {
        if (x.id !== game.id) return x;
        return game;
      }),
    });

  const remove = (game) => updateState({ ...state, games: state.games.filter((x) => x.id !== game.id) });

  const reset = () => updateState(newState);

  return <backlogContext.Provider value={{ backlog: state, get, add, update, remove, reset }}>{children}</backlogContext.Provider>;
}

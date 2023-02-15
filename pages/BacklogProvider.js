import { createContext, useContext, useState } from 'react';
import { backup as backupBacklog, restore as restoreBacklog } from '../clients/api';

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

  const backup = async () => {
    const yes = confirm('Are you sure you want to backup?');
    if(yes) await backupBacklog(state);
  };

  const restore = async () => {
    let yes = confirm('Are you sure you want to restore?');
    if(yes) { 
      const games = await restoreBacklog();
      yes = confirm(`This will replace ${state.games.length} games with ${games.length} games. Continue?`);
      if(yes) updateState({ ...state, games });
    }
  };

  return <backlogContext.Provider value={{ backlog: state, get, add, update, remove, reset, backup, restore }}>{children}</backlogContext.Provider>;
}

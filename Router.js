import { createContext, useContext, useState } from "react";
import states from "./constants/states";

const routerContext = createContext();

export const useRouter = () => useContext(routerContext);

export default function Router({ children }) {

    if(typeof window === 'undefined') return <div/>;

    const [selectedGame, setSelectedGame] = useState();
    const [selectedState, setSelectedState] = useState(states[0]);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isAddGameVisible, setIsAddGameVisible] = useState(false);
    const [isEditGameVisible, setIsEditGameVisible] = useState(false);

    const showGameDetails = (game) => {
        hideAddGame();
        setIsEditGameVisible(false);
        setSelectedGame(game);
        window.history.pushState('', '', '#' + Math.random());
    }

    const showEditGameDetails = () => {
        setIsEditGameVisible(true);
    }

    window.onhashchange = () => goBackToBacklog();

    const showAddGame = () => {
        hideSearch();
        setSelectedGame(null);
        setIsAddGameVisible(true);
        window.history.pushState('', '', '#' + Math.random());
    }

    const hideAddGame = () => setIsAddGameVisible(false);

    const showSearch = () => {
        setIsSearchVisible(true);
        window.history.pushState('', '', '#' + Math.random());
    }

    const hideSearch = () => setIsSearchVisible(false);

    const goBackToBacklog = () => {
        setSelectedGame(null);
        hideAddGame();
        hideSearch();
        setIsEditGameVisible(false);
    }

    const goBack = () => {
        if(isSearchVisible && selectedGame){
            setSelectedGame(null);
        } else {
            goBackToBacklog();
        }
    }

    return (
        <routerContext.Provider value={{ selectedGame, goBack, selectedState, isSearchVisible, isEditGameVisible, showEditGameDetails, goBackToBacklog, showGameDetails, setSelectedState, isAddGameVisible, showAddGame, hideAddGame, showSearch, hideSearch }}>
            {children}
        </routerContext.Provider>
    )
}
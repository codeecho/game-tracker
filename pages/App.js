import React from "react";
import BacklogProvider from "./BacklogProvider";
import AddGame from "../components/AddGame";
import Backlog from "../components/Backlog";
import EditGame from "../components/EditGame";
import Game from "../components/Game";
import Router, { useRouter } from "../Router";
import Search from "../components/Search";

export default function App() {
  return (
    <BacklogProvider>
      <Router>
        <Main/>
      </Router>
    </BacklogProvider>
  );
}

function Main(){

  const { isAddGameVisible, selectedGame, isSearchVisible } = useRouter();
  
  const showBacklog = !selectedGame && !isAddGameVisible && !isSearchVisible;

  return (
    <div>
      <OptionalComponent />
      <div style={{display: isSearchVisible && !selectedGame ? 'block' : 'none' }}>
        <Search/>
      </div>
      <div style={{display: showBacklog ? 'block' : 'none' }}>
        <Backlog/>
      </div>
    </div>
  )
}

function OptionalComponent(){
  const { isAddGameVisible, isEditGameVisible, selectedGame } = useRouter();
  if(isAddGameVisible) return <AddGame />
  if(selectedGame && !isEditGameVisible) return <Game />;
  if(selectedGame && isEditGameVisible) return <EditGame />;
  return null;
}
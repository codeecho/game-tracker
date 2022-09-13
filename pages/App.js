import React from "react";
import BacklogProvider from "./BacklogProvider";
import AddGame from "../components/AddGame";
import Backlog from "../components/Backlog";
import EditGame from "../components/EditGame";
import Game from "../components/Game";
import Router, { useRouter } from "../Router";

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

  const { isAddGameVisible, isEditGameVisible, selectedGame } = useRouter();
  
  const showBacklog = !selectedGame && !isAddGameVisible;

  return (
    <div>
      { isAddGameVisible && <AddGame /> }
      { selectedGame && !isEditGameVisible && <Game /> }
      { selectedGame && isEditGameVisible && <EditGame /> }
      <div style={{display: showBacklog ? 'block' : 'none' }}>
        <Backlog/>
      </div>
    </div>
  )
}
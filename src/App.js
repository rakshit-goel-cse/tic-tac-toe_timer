

import { useState,useRef } from 'react';
import './App.css';
import MainGrid from './gamegrid/MainGrid.js';

function App() {
  const [gameType, setgameType] = useState('game1');
  const waitRef = useRef(5);
  const playerMoveChange = useRef(3);
  
  let size=500;

  const gameDetail=()=>{
    if(gameType==='game1'){
      return(
      <p><h1>Game 1</h1>
      Every Move will disappear with the gap of selected time</p>
      );
    }
    else if(gameType==='game2'){
      return(
        <p><h1>Game 2</h1>
        Every Movement will last only for the selected time</p>
        );
    }
    else if(gameType==='game3'){
      return(     
        <p><h1>Game 3</h1>
        Every selected time One Randon Chance will disappear</p>
      );
    }
    return (<></>);
  }

  const handleReset = () => {
    window.location.reload();
  };

  return (<>
    {/* ---------- TOP BAR ---------- */}
<div className="top-bar">

  <div className="control-group">
    <label>Fade Out Time</label>
    <input
      type="number"
      value={waitRef.current}
      min={1}
      max={10}
      onChange={(e) => {
        const value = parseInt(e.currentTarget.value, 10);
        waitRef.current = isNaN(value) ? 0 : Math.max(1, Math.min(10, value));
      }}
    />
    {waitRef.current < 1 && <label>Time must be greater than 0</label>}
  </div>

  <div className="control-group">
    <label>Player Change Time</label>
    <input
      type="number"
      value={playerMoveChange.current}
      min={1}
      max={10}
      onChange={(e) => {
        const value = parseInt(e.currentTarget.value, 10);
        playerMoveChange.current = isNaN(value) ? 0 : Math.max(1, Math.min(10, value));
      }}
    />
    {playerMoveChange.current < 1 && <label>Time must be greater than 0</label>}
  </div>

  <button className="button" onClick={handleReset}>
    Reset
  </button>
</div>

{/* ---------- MAIN AREA ---------- */}
<div className="main-area">

  <div className="grid-wrapper">
    <MainGrid
      id={1}
      size={size}
      value={{
        game: gameType,
        wait: waitRef.current * 1000,
        playerMoveTime: playerMoveChange.current * 1000
      }}
    />
  </div>

  <div className="game-info">
    {gameDetail()}
  </div>

</div>

{/* ---------- GAME SWITCH ---------- */}
<div className="game-switch">
  <button className="button" onClick={() => setgameType("game1")}>Game 1</button>
  <button className="button" onClick={() => setgameType("game2")}>Game 2</button>
  <button className="button" onClick={() => setgameType("game3")}>Game 3</button>
</div>
</>
  );
}

export default App;

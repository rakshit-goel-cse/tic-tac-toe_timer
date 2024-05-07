

import { createContext, useState } from 'react';
import './App.css';
import MainGrid from './gamegrid/MainGrid.js';
import { wait } from '@testing-library/user-event/dist/utils';

function App() {
  const [gameType, setgameType] = useState('game2');
let size=500;
let wait=5000;


  return (
    <div style={{justifyContent:"center",alignItems:"center",padding:10}}>
    
    <div style={{display:"flex",flex:2,justifyContent:"space-around"}}>
      <label>Fade out time</label>
      <input type='number' width={60}/>
      <button className='button'>Reset</button>
    </div>

    <div style={{margin:10,flex:7,minWidth:"100%",minHeight:500,justifyContent:"center",alignItems:"center"}}>
    <MainGrid id={1} size={size} value={{game:gameType,wait:wait}}/>
    </div>
    
    <div style={{display:"flex",flex:2,flexDirection:"row",justifyContent:"space-around",minWidth:size}}>
      <button className="button">Game 1</button>
      <button className="button">Game 2</button>
      <button className="button">Game 3</button>
    </div>

    </div>
  );
}

export default App;

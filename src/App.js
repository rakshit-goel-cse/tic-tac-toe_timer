

import { createContext, useState } from 'react';
import './App.css';
import MainGrid from './gamegrid/MainGrid.js';
import { wait } from '@testing-library/user-event/dist/utils';

function App() {
  const [gameType, setgameType] = useState('game1');
  const [wait,setWait] = useState(5);
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

  return (
    <div style={{justifyContent:"center",alignItems:"center",padding:10}}>
    
    <div style={{display:"flex",flex:2,justifyContent:"space-around"}}>
      <label>Fade out time</label>
      
      <div style={{display:"flex",flexDirection:"column",width:"250px",maxWidth:"250px"}}>
      <input type='number' width={60} value={wait} min={1} max={10}
      onChange={(e)=>{
        const value = parseInt(e.currentTarget.value, 10);
    if (value >= 1 && value <= 10) {
      setWait(value);
    }
    else if(isNaN(value)){
      setWait(0);
    }
    
      }}/>
    {wait<1 && <label>Time need to be greater then 0</label>}
    </div>

      <button className='button' onClick={()=>handleReset()}>Reset</button>
    </div>

    <div style={{margin:10,flex:7,display:'flex',minWidth:"100%",minHeight:500}}>
    <MainGrid id={1} size={size} value={{game:gameType,wait:wait*1000}}/>
    <div style={{flex:1 ,display:"flex", justifyContent:"center",alignItems:"center",padding:10}} >
      {gameDetail()}
      </div>
    </div>
    
    <div style={{display:"flex",flex:2,flexDirection:"row",justifyContent:"space-around",minWidth:size,marginTop:"20px"}}>
      <button className="button" onClick={()=>setgameType('game1')}>Game 1</button>
      <button className="button" onClick={()=>setgameType('game2')}>Game 2</button>
      <button className="button" onClick={()=>setgameType('game3')}>Game 3</button>
    </div>

    </div>
  );
}

export default App;


import { useState } from 'react';
import './App.css';
import MainGrid from './gamegrid/MainGrid.js';

function App() {

  const [data, setdata] = useState([[0,0,0],
                                    [0,0,0],
                                    [0,0,0]])
  
  
  

  return (
    <>
    <MainGrid id={1} size={500} data={data} setdata={setdata} wait={0}/>
    </>
  );
}

export default App;

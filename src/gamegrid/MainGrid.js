import { useState } from "react";
import GameBox from "./GameBox";


export default function MainGrid({id,size,data,setdata,wait}){
   
    const [player, setplayer] = useState(1);

  const setData=(x,y,changePlayer)=>{
    //making sure using previous state in case of timeout wait
    setdata(prevData => {
      // Create a copy of the current data state
      const newData = [...prevData];
      // Create a copy of the row to be updated
      const newRow = [...newData[x]];
      // Update the value at the specified position
      if (changePlayer) {
          newRow[y] = player;
      } else {
          newRow[y] = 0;
      }
      // Update the row in the newData array
      newData[x] = newRow;

      // Update the player if necessary
      if (changePlayer) {
          setplayer(player === 1 ? 2 : 1);
      }
      return newData;
  });
  }

    if(data===null || data===undefined){
        return(<></>);
    }

    const getRow=(id,x)=>{
        if(data[x]===null || data[x]===undefined){
            return(<></>);
        }
        return(
            <div id={id}
            style={{
                display:"flex",
                width:size,
                height:"32%",
                flexDirection:"row",
                justifyContent:"space-between",
                background:"black"
            }}>
                        <GameBox  id={id+"1"} data={data} x={x} y={0} setData={setData} wait={wait}/>
                        <GameBox  id={id+"2"} data={data} x={x} y={1} setData={setData} wait={wait}/>
                        <GameBox  id={id+"3"} data={data} x={x} y={2} setData={setData} wait={wait}/>
                    </div>
        );
    }

    return (
        <div style={{
            display:"flex",
            flex:1,
        width:size,
        height:size,
        background:"black",
        justifyContent:"space-between",
        flexDirection:"column"
        }}>
            {getRow(id+"1",0)}
            {getRow(id+"2",1)}
            {getRow(id+"3",2)}
        </div>
    );
}

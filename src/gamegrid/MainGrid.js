import { useEffect, useState } from "react";
import GameBox from "./GameBox";
import checkWin from "./VerifyGameOver";

let emptyArray = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
export default function MainGrid({ id, size, value }) {
  const [player, setplayer] = useState(1);
  const [data, setdata] = useState(emptyArray);
  const [gameover, setgameover] = useState(false);
  const [waitAdd, setwaitAdd] = useState(0);
  let timerId1=null;

    let game=value.game;
useEffect(() => {
    if(game==='game1' || game==='game3'){
    timerId1 = setTimeout(() => {
        console.log("waitadd imm- ",waitAdd);
        if(waitAdd>0){
            setwaitAdd(waitAdd-1000);
        }
    }, 1000);

  return () => {
    clearTimeout(timerId1);
  }
}
}, [waitAdd])

  useEffect(() => {
    if (gameover) {
      const timerId = setTimeout(() => {
        console.log("Win");
        alert("Player " + player + " Win");
        setgameover(false);
        setplayer(1);
        setdata(emptyArray);
      }, 1);
      if(null!=timerId1){
      clearTimeout(timerId1);
      }
      //clearTimeout(timerId);
    }
  }, [gameover]);

  const setData = (x, y, changePlayer) => {
    //making sure using previous state in case of timeout wait
    setdata((prevData) => {
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
        //checking for win
        if (!gameover && checkWin(newData)) {
          setgameover(true);
        } else {
          setplayer(player === 1 ? 2 : 1);
        }
      }
      return newData;
    });
  };

  if (data === null || data === undefined) {
    return <></>;
  }

  const getRow = (id, x) => {
    if (data[x] === null || data[x] === undefined) {
      return <></>;
    }
    return (
      <div
        id={id}
        style={{
          display: "flex",
          width: size,
          height: "32%",
          flexDirection: "row",
          justifyContent: "space-around",
          background: "black",
          borderRadius: "20%",
        }}
      >
        <GameBox
          id={id + "1"}
          data={data}
          x={x}
          y={0}
          setData={setData}
          value={value}
          gameover={gameover}
          waitAdd={waitAdd}
          setwaitAdd={setwaitAdd}
        />
        <GameBox
          id={id + "2"}
          data={data}
          x={x}
          y={1}
          setData={setData}
          value={value}
          gameover={gameover}
          waitAdd={waitAdd}
          setwaitAdd={setwaitAdd}
        />
        <GameBox
          id={id + "3"}
          data={data}
          x={x}
          y={2}
          setData={setData}
          value={value}
          gameover={gameover}
          waitAdd={waitAdd}
          setwaitAdd={setwaitAdd}
        />
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          width: size,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        Player {player} Chance
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          width: size,
          height: size,
          background: "black",
          justifyContent: "space-evenly",
          flexDirection: "column",
          borderRadius: "5%",
        }}
      >
        {getRow(id + "1", 0)}
        {getRow(id + "2", 1)}
        {getRow(id + "3", 2)}
      </div>
    </>
  );
}

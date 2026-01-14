import { useEffect, useRef, useState } from "react";
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
  const timerId1=useRef(null);

  //time for a player to make a move
  const [playerMoveTime,setPlayerMoveTime] = useState(value.playerMoveTime/1000);
  const playerTimeoutRef = useRef(null);
  
const gameRef = useRef(value.game);


// reset timer on game change
  useEffect(() => {
    if (data === emptyArray) {
      clearTimeout(playerTimeoutRef.current);
      playerTimeoutRef.current = null;
    }
    else if (null === playerTimeoutRef.current) {
      playerTimeoutRef.current = setInterval(() => {
        setPlayerMoveTime(prevData => {
          if (playerMoveTime < 1) {
            setplayer(prevData => prevData === 1 ? 2 : 1);
            return (value.playerMoveTime / 1000);
          }
          return prevData - 1;
        });
      }, 1000);
    }

    return () => {
    clearInterval(playerTimeoutRef.current);
    playerTimeoutRef.current = null;
  };

  }, [data, player, playerMoveTime,value.playerMoveTime])

useEffect(() => {
  gameRef.current = value.game;
  //reset game
  setgameover(false);
  setplayer(1);
  setdata(emptyArray);
  setwaitAdd(0);
}, [value.game]);


useEffect(() => {
    if(gameRef.current === 'game1' || gameRef.current === 'game3'){
    timerId1.current = setTimeout(() => {
        console.log("waitadd imm- ",waitAdd);
        if(waitAdd>0){
            setwaitAdd(waitAdd-1000);
        }
    }, 1000);

  return () => {
    clearTimeout(timerId1.current);
  }
}
}, [waitAdd])

  useEffect(() => {
    if (gameover) {
      setTimeout(() => {
        console.log("Win");
        alert("Player " + player + " Win");
        setgameover(false);
        setplayer(1);
        setdata(emptyArray);
      }, 1);
      if(null!=timerId1.current){
      clearTimeout(timerId1.current);
      }
    }
  }, [gameover,player]);

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
          setPlayerMoveTime(value.playerMoveTime/1000);
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
          // background: "transpe",
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
    <div style={{display:"flex",flex:'1',flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
      <h2
        style={{
          width: size,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        Player {player}
      </h2>

      {/* Time bar */}
      <div style={{
  width: "100%",
  height: "12px",
  background: "rgba(255,255,255,0.15)",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "12px"
}}>
  <div
    style={{
      height: "100%",
      width: `${(playerMoveTime / value.playerMoveTime) * 100000}%`,
      background: "linear-gradient(90deg, #22d3ee, #6366f1)",
      transition: "width 1s linear"
    }}
  />
</div>

      <div
        style={{
          display: "flex",
          flex: 1,
          width: size,
          height: size,
          background: "rgba(102, 188, 245, 0.62)",
          justifyContent: "space-evenly",
          flexDirection: "column",
          borderRadius: "5%",
        }}
      >
        {getRow(id + "1", 0)}
        {getRow(id + "2", 1)}
        {getRow(id + "3", 2)}
      </div>
    </div>
  );
}

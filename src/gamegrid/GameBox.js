import { useEffect, useRef } from "react";

let chances=[];

export default function GameBox({id,data,x,y,setData,value,gameover,waitAdd,setwaitAdd}){
    
    let wait=value.wait;
    let game=value.game;
    const timerId = useRef(null);
      

    useEffect(() => {
        console.log("timeclear",gameover,timerId.current)
        if(gameover && null!==timerId.current){
            clearTimeout(timerId.current);
        }
    }, [gameover,game])
    

    //delete one change in 5 sec
    const game1=()=>{
        chances.push([x,y]);
        console.log("game1-  ",chances,waitAdd);
        
            let temptimerId = setTimeout(() => {
                console.log("timm")
                if (chances.length > 0) {
                    let pos = chances.shift();
                    setData(...pos, false);
                }

            },wait+ waitAdd);
            timerId.current=temptimerId;
            setwaitAdd(waitAdd+wait);
            
    }
    //delete each change in 5 sec
    const game2=()=>{
        let temptimerId = setTimeout(() => {
            // Update the state after 1 second
            setData(x,y,false);
        }, wait);
        timerId.current=temptimerId;
  
    }
    const game3=()=>{
        chances.push([x,y]);
        console.log("game1-  ",chances,waitAdd);
        
            let temptimerId = setTimeout(() => {
                console.log("timm")
                if (chances.length > 0) {
                    const randomIndex = Math.floor(Math.random() * chances.length);
                    let pos= chances.splice(randomIndex, 1)[0];
                    setData(...pos, false);
                }

            },wait+ waitAdd);
            timerId.current=temptimerId;
            setwaitAdd(waitAdd+wait);
    }

    const performTouch=(id)=>{
        console.log("touch",x,y,data[x][y],game);
        if(data[x][y]===0){
            console.log("game1-  ",wait);
            setData(x,y,true);
            if(wait!==null && wait!==undefined && wait>0){
                console.log("game1-  ",chances);
                if(game==='game1'){
                    game1();
                }
                else if(game==='game2'){
                    game2();
                }
                else if(game==='game3'){
                    game3();
                }
            }
        }
    }
    return(
        <div id={id} 
        style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30%",
//   marginLeft: "20%",
  aspectRatio: "1",
  background: "linear-gradient(135deg, #e0f2fe, #c7d2fe)",
  borderRadius: "20px",
  boxShadow: `
    inset 0 0 0 2px rgba(255,255,255,0.6),
    0 10px 30px rgba(59,130,246,0.6)
  `,
  fontSize: "48px",
  fontWeight: "700",
  color: "#1e293b",
  cursor: "pointer",
  transition: "transform 0.15s, box-shadow 0.15s",
//   onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"},
//   onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
}} 
        onClick={()=>performTouch(id)}>
            
        {data[x][y] === 1 && "X"}
        {data[x][y] === 2 && "O"}
        {}
        </div>
    );
}
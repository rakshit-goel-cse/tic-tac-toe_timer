
export default function GameBox({id,data,x,y,setData,wait}){
    
    const performTouch=(id)=>{
        console.log("touch",x,y,data[x][y]);
        if(data[x][y]===0){
            setData(x,y,true);
            if(wait!==null && wait!==undefined && wait>0){
                const timerId = setTimeout(() => {
                    // Update the state after 1 second
                    setData(x,y,false);
                }, wait);
            }
        }
    }
    return(
        <div id={id} style={{display:"flex",background:"white",width:"32%"
        ,alignItems:"center",justifyContent:"center"}} onClick={()=>performTouch(id)}>
            
        {data[x][y] === 1 && "X"}
        {data[x][y] === 2 && "O"}
        
        </div>
    );
}
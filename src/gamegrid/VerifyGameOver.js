export default function checkWin(data){
    if(data!==null && data!==undefined && 
        data[0]!==null && data[0]!==undefined &&
        data[1]!==null && data[1]!==undefined &&
        data[2]!==null && data[2]!==undefined){
        
            for (let i = 0; i < 3; i++) {
                if (data[i][0] !== 0 && data[i][0] === data[i][1] && data[i][0] === data[i][2]) {
                    return true; 
                }
            }
        
            // Check columns
            for (let j = 0; j < 3; j++) {
                if (data[0][j] !== 0 && data[0][j] === data[1][j] && data[0][j] === data[2][j]) {
                    return true;
                }
            }
        
            // Check diagonals
            if (data[0][0] !== 0 && data[0][0] === data[1][1] && data[0][0] === data[2][2]) {
                return true;
            }
            if (data[0][2] !== 0 && data[0][2] === data[1][1] && data[0][2] === data[2][0]) {
                return true;
            }
    }
    return false;
}
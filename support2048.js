documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSlideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i,j){
    return cellSpace + i*(cellSpace+cellSlideLength);
}

function getPosLeft(i,j){
    return cellSpace + j * (cellSpace+cellSlideLength);
}

function getNumberBackGroundColor(num){
    switch(num){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
        case 16384:return "grey";break;

    }

    return black;

}

function getNumColor(num){
    if(num <= 4)
        return "#776e65";
    else return "white";
}

function nospace(board){
    for (var a=0;a<4;a++)
        for (var b=0;b<4;b++)
            if(board[a][b]==0)
                return false;
    return true;


}

function canMoveLeft(board){
    for (var i=0;i<4;i++)
        for (var j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0)
                    return true;
                else if (board[i][j]==board[i][j-1]){
                    return true;
                }
            }
                
        }
    return false;

}

function canMoveRight(board){
    for (var i=0;i<4;i++)
        for (var j=0;j<3;j++){
            if(board[i][j]!=0){
                if(board[i][j+1]==0)
                    return true;
                else if (board[i][j]==board[i][j+1]){
                    return true;
                }
            }
                
        }
    return false;

}

function canMoveUp(board){
    for(var col=0;col<4;col++)
        for(row=1;row<4;row++)
            if(board[row][col]!=0){
                if(board[row-1][col]==0 || board[row][col]==board[row-1][col])
                    return true;
            }
            
    return false;
}
function canMoveDown(board){
    for(var col=0;col<4;col++)
        for(row=2;row>=0;row--)
            if(board[row][col]!=0){
                if(board[row+1][col]==0 || board[row][col]==board[row+1][col])
                    return true;
            }
    return false;
}

function nomove(b){
    return !(canMoveDown(b) || canMoveLeft(b) || canMoveRight(b) || canMoveUp(b)) ;
}

function noBlockHorizontal(i,k,j,board){
    for(var a = k+1;a<j;a++){
        if (board[i][a]!=0)
            return false
    }
    return true
}

function noBlockVertical(col,row1,row2,board){
    for(var a = row1 + 1 ;a < row2;a++){
        if (board[a][col]!=0)
            return false
    }
    return true
}
       
var board = new Array();
var score = 0;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;



$(document).ready(function(){
    prepareForMobile();
    newgame();
});

function prepareForMobile(){
    if (documentWidth > 500){
        gridContainerWidth = 500;
        cellSlideLength = 100;
        cellSpace = 20;

    }
    $('#grid-container').css('width',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('border-radius',0.02 * gridContainerWidth);
    
    $('.grid-cell').css('width',cellSlideLength);
    $('.grid-cell').css('height',cellSlideLength);
    $('.grid-cell').css('border-radius',0.02 * cellSlideLength);
    
}

function newgame(){
    //init grid
    init();
    //generate 2 digit in the grid randomly 
    generateOneNum();
    generateOneNum();

}

function init(){
    for (var i = 0 ; i < 4 ; i ++)
        for(var j = 0 ; j < 4 ;j ++){
            var gridCell = $("#grid-cell-" + i + '-' + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    for(var i = 0; i<4 ;i++){
        board[i] = new Array();
        for( var j = 0; j<4 ; j++){
            board[i][j] = 0 ;
        }
    }

    updateBoardView();
} 



function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++)
        for(var j = 0; j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j +'"></div>');
            var the_number_cell = $('#number-cell-'+i+'-'+j);

            if( board[i][j]==0){
                the_number_cell.css('width','0px');
                the_number_cell.css('height','0px');
                the_number_cell.css('top',getPosTop(i,j)+cellSlideLength/2);
                the_number_cell.css('left',getPosLeft(i,j)+cellSlideLength/2);


            }
            else{
                the_number_cell.css('width',cellSlideLength );
                the_number_cell.css('height',cellSlideLength );
                the_number_cell.css('border-radius',0.02 * cellSlideLength);

                the_number_cell.css('top',getPosTop(i,j)) ;
                the_number_cell.css('left',getPosLeft(i,j));
                the_number_cell.css('background-color',getNumberBackGroundColor(board[i][j]));
                the_number_cell.css('color',getNumColor(board[i][j]));
                the_number_cell.text(board[i][j]);


            }
        }
    $(".number-cell").css("line-height",cellSlideLength + 'px');
    $(".number-cell").css("font-size",0.6*cellSlideLength + 'px');

}

function generateOneNum(){
    if(nospace(board))
        return false;
    else {
        //random position
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));

        var times = 0;
        while(times<40){
            if(board[randx][randy]==0)
                break;
            else
                randx = parseInt(Math.floor(Math.random()*4));
                randy = parseInt(Math.floor(Math.random()*4));
                times++;

        }
        if(times=40){
            for(var i=0;i<4;i++)
                for(var j=0;j<4;j++){
                    if(board[i][j]==0){
                        randx = i;
                        randy = j;
                    }
                    
                }
        }
        //random num

        var randomNumber = Math.random() < 0.5 ? 2 : 4;

        board[randx][randy] = randomNumber;
        showNumberWithAnimation(randx,randy,randomNumber);
        return true;

    }
        
}

function isGameOver(){
    if(nospace(board) && nomove(board)){
        GameOver();
    }
}

function GameOver(){
    alert('Game Over!');
}

$(document).keydown(function(event){
    
    switch(event.keyCode){
        case 37://left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("generateOneNum()",210);
                setTimeout("isGameOver()",400);
            }
            break;
        case 38://up
            event.preventDefault();
            if(moveUp()){
                setTimeout("generateOneNum()",210);

                setTimeout("isGameOver()",400);
            }
            break;
        case 39://right
            event.preventDefault();
            if(moveRight()){
                setTimeout("generateOneNum()",210);
                // generateOneNum();

                setTimeout("isGameOver()",400);
            }
            break;
        case 40://down
            event.preventDefault();
            if(moveDown()){
                setTimeout("generateOneNum()",210);
                
                setTimeout("isGameOver()",400);
            }
            break;
        default://others
            break;
    }
});

document.addEventListener('touchstart',function(event){
    event.preventDefault();

    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){//prevent Android bug
    event.preventDefault();
});
document.body.addEventListener('touchmove', function(e) {
    if (e._isScroller) return;
    e.preventDefault();//阻止默认的处理方式(阻止下拉滑动的效果)
}, {
    passive: false  
});//passive 参数不能省略，用来兼容ios和android
document.addEventListener('touchend',function(event){
    event.preventDefault();

    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx ;
    var deltay = endy - starty ;

    if(Math.abs(deltax) < 0.2 * documentWidth && Math.abs(deltay) < 0.2 * documentWidth)
        return;

    if(Math.abs(deltax)>Math.abs(deltay)){ //x
        if(deltax > 0){ 
            //right
            if(moveRight()){
                setTimeout("generateOneNum()",210);
                // generateOneNum();

                setTimeout("isGameOver()",400);
            }

        }
        else{
            //left
            if(moveLeft()){
            setTimeout("generateOneNum()",210);
            setTimeout("isGameOver()",400);
        }
    }}
    else{ //y
        if(deltay > 0){ 
            //down
            if(moveDown()){
                setTimeout("generateOneNum()",210);
                
                setTimeout("isGameOver()",400);
            }

        }
        else{
            //up
            if(moveUp()){
                setTimeout("generateOneNum()",210);

                setTimeout("isGameOver()",400);
            }
        }

    }

});

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }

    //moveleft
    for (var i=0;i<4;i++){
        var be_generated = -1;
        for (var j=1;j<4;j++){
            if(board[i][j]!=0){
                for (var k = 0;k<j;k++){
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0
                        continue;
                    }
                    else if(board[i][k]==board[i][j]  && be_generated != k && noBlockHorizontal(i,k,j,board)){
                        //move
                        //add
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        be_generated = k
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                        
                
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    // updateBoardView()
    
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }

    //moveright
    for (var i=0;i<4;i++){
        var be_generated = -1;
        for (var j=2;j>=0;j--){
            if(board[i][j]!=0){
                for (var k = 3;k>j;k--){
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k]==board[i][j]  && be_generated!=k && noBlockHorizontal(i,j,k,board)){
                        //move
                        //add
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        be_generated = k; 
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                        
                
                }
            }
        }}

    setTimeout("updateBoardView()",200);
    // updateBoardView()
    
    return true;
}
function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }

    //moveUp
    for (var i=0;i<4;i++){
        var be_generated = -1;

        for (var j=1;j<4;j++){
            if(board[j][i]!=0){
                for (var k = 0;k<j;k++){
                    if(board[k][i]==0 && noBlockVertical(i,k,j,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }
                    else if(board[k][i]==board[j][i] && be_generated!=k && noBlockVertical(i,k,j,board)){
                        //move
                        //add
                        showMoveAnimation(j,i,k,i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        be_generated = k;
                        score += board[k][i];
                        updateScore(score);
                        continue;
                    }
                        
                
                }
            }
        }}

    setTimeout("updateBoardView()",200);
    // updateBoardView()
    
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    //movedown
    for (var i=0;i<4;i++){
        var be_generated = -1;
        for (var j=2;j>=0;j--){
            if(board[j][i]!=0){
                for (var k = 3;k>j;k--){
                    if(board[k][i]==0 && noBlockVertical(i,j,k,board)){
                        //move
                        showMoveAnimation(j,i,k,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }
                    else if(board[k][i]==board[j][i] && be_generated!=k && noBlockVertical(i,j,k,board)){
                        //move
                        //add
                        showMoveAnimation(j,i,k,i);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        be_generated = k
                        score += board[k][i];
                        updateScore(score);
                        continue;
                    }
                        
                
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    // updateBoardView()
    
    return true;
}


function showNumberWithAnimation(x,y,num){
    var numbercell = $("#number-cell-"+x+'-'+y);
    numbercell.css('background-color',getNumberBackGroundColor(num));
    numbercell.css('color',getNumColor(num));
    numbercell.text(num);

    numbercell.animate({
        width:cellSlideLength,
        height:cellSlideLength,
        top:getPosTop(x,y),
        left:getPosLeft(x,y),
    },60); //60ms

}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numbercell = $("#number-cell-"+ fromx+'-' + fromy);
    numbercell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);

}

function updateScore(score){
    $("#score").text(score);
}
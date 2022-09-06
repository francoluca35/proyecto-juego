var caractor = document.getElementById("caracter");
var game =document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];


    function moveLeft(){
        var left = parseInt(window.getComputedStyle(caracter).getPropertyValue("left"));
        if(left>0){
            caracter.style.left = left - 1 + "px";
        }
    };

    function moveRight(){
        var left = parseInt(window.getComputedStyle(caracter).getPropertyValue("left"));
        if(left<380){
            caracter.style.left = left + 1 + "px";
        }
    };

document.addEventListener("keydown", event =>{
    if (both==0){
        both++;
        if(event.key === "arrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key === "arrowright"){
            interval=setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 60 + "px";
        hole.style.top = holeLastTop + 60 + "px";
        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var caracterTop = parseInt(window.getComputedStyle(caracter).getPropertyValue("top"));
    var caracterLeft = parseInt(window.getComputedStyle(caracter).getPropertyValue("left"));
    var drop = 0;
    if(caracterTop < 0){
        alert("Game Over. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }
        for(var i = 0; i <currentBlocks.length;i++){
            let current = currentBlocks[i];
            let iblock = document.getElementById("block"+current);
            let ihole = document.getElementById("hole"+current);
            let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
            let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
            iblock.style.top = iblockTop - 0.5 + "px";
            ihole.style.top = iblockTop -0.5 + "px";
                if(iblockTop<-20){
                    currentBlocks.shift();
                    iblock.remove();
                    ihole.remove();
                }
                if(iblockTop-20<caracterTop && iblockTop>caracterTop){
                    drop++;
                    if(iholeLeft<caracterLeft && iholeLeft+20>caracterLeft){
                        drop = 0;
                    }
                }
        }
    if(drop==0){
        if(caracterTop<480){
            caracter.style.top = caracterTop + 2 + "px";
        }
    }else{
        caracter.style.top = caracterTop - 0.5 + "px";
    }
},1);

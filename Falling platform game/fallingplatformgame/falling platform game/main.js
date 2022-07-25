let cnv = document.getElementById("my-canvas")
let ctx = cnv.getContext("2d")
document.addEventListener("mousedown", () => mouseIsPressed = true);
document.addEventListener("mouseup", () => mouseIsPressed = false);
//document.addEventListener("mousemove", mousemoveHandlerLib);
document.addEventListener("keydown", (e) => keyPressed[e.code] = true);
document.addEventListener("keyup", (e) => keyPressed[e.code] = false);
cnv.width = 800
cnv.height = 600


//variables
 let mouseX;
 let mouseY;
 let mouseIsPressed = false;
 let keyPressed = {};
//different rectangles
let rectangles = [];
 for (let i=1; i<=50;i++) {
    rectangles.push(newRandomRectangle());
 }
 let state = "start";

 window.addEventListener("load",mainmenu)
 function mainmenu(){
    if (state === "start"){
        startscreen();
    } else if (state ==="gameon") {
        drawGame();
    } else if (state ==="gameover"){
         drawGameOver();
    }

    
    requestAnimationFrame(mainmenu);
 }

//draw rectangles
function drawGame() {
  
    ctx.clearRect(0,0,cnv.width,cnv.height)
    ctx.strokeRect(player.x,player.y,player.w,player.h)
    move();
   
    //when mouse is pressed on a rectangle then it goes back to the top
   for (let i = 0; i < rectangles.length; i++ ) {
        moveRectangle(rectangles[i]);
        drawRectangle(rectangles[i]);
        drawcoins();
        collectcoins();
        
   }
   collide();
}
function collide(){
    for (let i =0;i<rectangles.length;i++)
    if (rectCollide(player, rectangles[i])){
            state = "gameover"   
        }
    }

function reset(){
    state="start"

}



function startscreen(){
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Green Bars
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
  
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("Falling Platform", 25, 35);
   
    
// Start Text
ctx.font = "60px Consolas";
ctx.fillStyle = "lightblue";
ctx.fillText("CLICK TO START", 350, 285)
}

//event stuff
document.addEventListener("mousedown", mousedownHandler);
function mousedownHandler(){
    if (state === "start"){
         state ="gameon";
    }
}

//collision between
function playercollision(){

    state = "gameover"
}
//gameover function

    function drawGameOver() {
        // Background
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, cnv.width, cnv.height);
      
        // Green Bars
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, cnv.width, 50);
        ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
      
        // Green Bar Text
        ctx.font = "30px Consolas";
        ctx.fillStyle = "black";
        ctx.fillText("Falling Platforms", 25, 35);
        ctx.fillText("DISTANCE: 0", 25, cnv.height - 15);
    
        // Draw Wall 1
        ctx.fillStyle = "green";
        ctx.fillRect(700, 200, 50, 100);
      
        // Game Over Text
        ctx.font = "40px Consolas";
        ctx.fillStyle = "lightblue";
        ctx.fillText("GAME OVER!!!!!", 350, 285);
        ctx.fillText("Press Refresh to restart",280,400)
      }

function newRectangle(initX,initY,initW,initH,initColor,initSpeed) {
    return {
    
        x: initX,
        y: initY,
        w: initW,
        h: initH,
        color: initColor,
        speed : initSpeed,
        
        
    }
}
//draw rectangles
function drawRectangle(aRectangle) {
    fill(aRectangle.color)
    rect(aRectangle.x,aRectangle.y ,aRectangle.w,aRectangle.h,"fill")

}
//moving the rectangles

function moveRectangle(aRectangle) {

    if (aRectangle.y < cnv.height ){
        aRectangle.y += aRectangle.speed;
    } else {
        aRectangle.x = randomInt(aRectangle.w,cnv.width -aRectangle.w)
        aRectangle.y = - aRectangle.h - 10
    }
}


//creating a random different sized rectanlges
function newRandomRectangle() {
    
        let temp = {
        
        y: randomInt(0 ,0),
        w : randomInt(5,100),
        h : randomInt(5,60),
        color: randomRGB(),
        speed: randomInt(2,100),
        }
    temp.x =  randomInt(temp.x,cnv.width-temp.w)
    return temp
}



//player dimensions
let player = {
    x:300,
    y:200,
    w:25,
    h:25,
    speed:5


}

//move the character
function move(){
    if (keyPressed["ArrowUp"]) {
        player.y += -player.speed;
    } else if (keyPressed["ArrowDown"]){
        player.y += player.speed;
    }
    if (keyPressed["ArrowLeft"]) {
        player.x += -player.speed;
    } else if (keyPressed["ArrowRight"]){
        player.x += player.speed;
    }
    //player movement restrictions
    if (player.x + player.w >= cnv.width) {
        player.x = cnv.width - player.w
    } else if (player.x <0) {
        player.x = 0
    }
    if (player.y + player.h >=cnv.height) {
        player.y = cnv.height - player.h
    } else if (player.y <0) {
        player.y =  0
    }
}






function initcoins(n){
    let tempblock = []
    for (let num = 1;num <=n;num++){
    tempblock.push(newRandomCoin())
    }
    return tempblock
}



//coins
let coins = initcoins(400);

// drawing all the coins
function drawcoins(){
    ctx.fillstyle ="yellow"
    for (let i = 0; i< coins.length;i++){
        drawcoin(coins[i])
    }

}
//collect coins function
function collectcoins(){
    for (let i = 0; i < coins.length;i++){
        if (rectCollide(player,coins[i])){
            coins.splice(i,1);
            drawcoins();
        }
    }
}
//drawing a single coin
function drawcoin(coin){
    ctx.fillRect(coin.x,coin.y,coin.w,coin.h)
}
//new random coin
function newRandomCoin() {
    return{
    x: Math.random()*cnv.width,
    y: Math.random()*cnv.height,
    w: 10,
    h:10,
    color:"yellow"
    }
}




















//random integer/decima/color functions
function randomDec(low,high) {
    return Math.random() *(high-low) +low;
 
 
 }
 //return a random integer between low and high
 function randomInt(low,high) {
    return Math.floor(Math.random() *(high-low)+low);
 
 }
 // return a random rgb string
 function randomRGB() {
    let r=randomInt(0,256);
    let g=randomInt(0,256);
    let b=randomInt(0,256);
 
    return "rgb("+ r +", "+g+", " +b+")";
 } 

 



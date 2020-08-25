
let canvas;
let ctx;
const WIDTH = 1200;
const HEIGHT = 800;
const tileW  = 20;
const tileH  = 20;

const tileRowCount = 25;
const tileColumnCount = 40;

let tiles = [];
let boundX = 0;
let boundY = 0;
for(let c = 0;c<tileColumnCount;c++){
  tiles[c] = [];
  for(let r=0;r<tileRowCount;r++){
    tiles[c][r] = {x: c*(tileW + 3), y : r*(tileH+3),state: 'e'};
  }
}
tiles[0][0].state = 's';
tiles[tileColumnCount-1][tileRowCount-1].state = 'f';

function rect(x,y,w,h,state){
  if(state== 's')
    ctx.fillStyle = '#00ff00'; // start point
  else if (state == 'f')
    ctx.fillStyle = '#ff0000'; // end point
  else if(state == 'e')
    ctx.fillStyle = '#AAAAAA'; // grey(not maze)
  else if(state == 'w')
    ctx.fillStyle = '#0000ff'; // blue (maze)
  else if(state == 'x')
    ctx.fillStyle = '#ffff00'; // yellow (actual path)
  else
    ctx.fillStyle = '#000000';//black(visited)
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}
function clear(){
  ctx.clearRect(0,0,WIDTH,HEIGHT);
}
function draw(){
  clear();
 for(let c = 0;c<tileColumnCount;c++){
    for(let r=0;r<tileRowCount;r++){
      rect(tiles[c][r].x,tiles[c][r].y,tileW,tileH,tiles[c][r].state);
    }
  }
}

function init(){
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
  setInterval(draw, 10);
}

function myMove(e){
const x = e.pageX - canvas.offsetLeft;
const y = e.pageY - canvas.offsetTop;
  for(let c=0;c<tileColumnCount;c++){
    for(let r=0;r<tileRowCount;r++){
      if(x > c*(tileW+3) && x <c*(tileW+3)+tileW && y > r*(tileH+3) && y < r*(tileH+3)+tileH){
        if(tiles[c][r].state == 'e'&& (c!=boundX || r != boundY)){
          tiles[c][r].state ='w';
          boundX = c; boundY = r;
        }
        else if(tiles[c][r].state == 'w'&& (c!=boundX || r != boundY)){
          tiles[c][r].state ='e';
          boundX = c; boundY = r;
        }
      }
    }
  }
}
function myDown(e){
canvas.onmousemove = myMove;
  const x = e.pageX - canvas.offsetLeft;
  const y = e.pageY - canvas.offsetTop;
  for(let c=0;c<tileColumnCount;c++){
    for(let r=0;r<tileRowCount;r++){
      if(x > c*(tileW+3) && x <c*(tileW+3)+tileW && y > r*(tileH+3) && y < r*(tileH+3)+tileH){
        if(tiles[c][r].state == 'e' && (c!=boundX || r != boundY)){
          tiles[c][r].state ='w';
          boundX = c; boundY = r;
        }
        else if(tiles[c][r].state == 'w' && (c!=boundX || r != boundY)){
          tiles[c][r].state ='e';
          boundX = c; boundY = r;
        }
      }
    }
  }
}
function myUp(e){
  canvas.onmousemove = null;
}
function reset(){
  for(let c = 0;c<tileColumnCount;c++){
    tiles[c] = [];
    for(let r=0;r<tileRowCount;r++){
      tiles[c][r] = {x: c*(tileW + 3), y : r*(tileH+3),state: 'e'};
    }
  }
  tiles[0][0].state = 's';
  tiles[tileColumnCount-1][tileRowCount-1].state = 'f';
}

function solveMaze(){
  let xQueue = [0];
  let yQueue = [0];
  let pathFound = false;
  let xLoc , yLoc;
    while(xQueue.length >0 && !pathFound){
      xLoc = xQueue.shift();
      yLoc = yQueue.shift();
      if(xLoc>0){
        if(tiles[xLoc-1][yLoc].state == 'f') pathFound = true;
      }
      if(xLoc<tileColumnCount-1){
        if(tiles[xLoc+1][yLoc].state == 'f') pathFound = true;
      }
      if(yLoc>0){
        if(tiles[xLoc][yLoc-1].state == 'f') pathFound = true;
      }
      if(yLoc<tileRowCount-1){
        if(tiles[xLoc][yLoc+1].state == 'f') pathFound = true;
      }
      if(xLoc<tileColumnCount-1 && yLoc<tileRowCount-1){
        if(tiles[xLoc+1][yLoc+1].state == 'f') pathFound = true;

      }

      if(xLoc>0){
        if(tiles[xLoc-1][yLoc].state == 'e') {
            xQueue.push(xLoc-1); yQueue.push(yLoc);
            tiles[xLoc-1][yLoc].state = tiles[xLoc][yLoc].state+'l';
        }
      }
      if(xLoc<tileColumnCount-1){
        if(tiles[xLoc+1][yLoc].state == 'e') {
          xQueue.push(xLoc+1); yQueue.push(yLoc);
          tiles[xLoc+1][yLoc].state = tiles[xLoc][yLoc].state+'r';
        }
      }
      if(yLoc>0){
        if(tiles[xLoc][yLoc-1].state == 'e') {
          xQueue.push(xLoc); yQueue.push(yLoc-1);
          tiles[xLoc][yLoc-1].state = tiles[xLoc][yLoc].state+'u';
        }
      }
      if(yLoc<tileRowCount-1){
        if(tiles[xLoc][yLoc+1].state == 'e') {
          xQueue.push(xLoc); yQueue.push(yLoc+1);
          tiles[xLoc][yLoc+1].state = tiles[xLoc][yLoc].state+'d';
        }
      }
    }
    if(!pathFound)
        output.innerHTML = 'No Solution';
    else{
      const path =tiles[xLoc][yLoc].state;
      console.log(path);
      const pathLength = path.length;
      let currX = 0;
      let currY = 0;
      for(let i =0;i<pathLength-1;i++){

          if(path.charAt(i+1) == 'u')
            currY -=1;
          if(path.charAt(i+1) == 'd')
            currY +=1;
          if(path.charAt(i+1) == 'l')
            currX -=1;
          if(path.charAt(i+1) == 'r')
            currX +=1;
         tiles[currX][currY].state = 'x';
      }
    }


}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;

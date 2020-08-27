
let canvas;
let ctx;
const WIDTH =  1200;
const HEIGHT = 800;
const tileW  = 20;
const tileH  = 20;

const tileRowCount = 25;
const tileColumnCount = 40;

let tiles = [];
let boundX = 0;
let boundY = 0;
let distance = [];
for(let c = 0;c<tileColumnCount;c++){
  tiles[c] = [];
  distance[c] = [];
  for(let r=0;r<tileRowCount;r++){
    tiles[c][r] = {x: c*(tileW + 3), y : r*(tileH+3),state: 'e'};
    distance[c][r] = {local : Number.MAX_VALUE , global: Number.MAX_VALUE , parent :{x: -1 , y: -1} };
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
    distance[c] = [];
    for(let r=0;r<tileRowCount;r++){
      tiles[c][r] = {x: c*(tileW + 3), y : r*(tileH+3),state: 'e'};
      distance[c][r] = {local : Number.MAX_VALUE , global: Number.MAX_VALUE , parent :{x: -1 , y: -1} };
    }
  }
  tiles[0][0].state = 's';
  tiles[tileColumnCount-1][tileRowCount-1].state = 'f';
}
function solveMaze(){
    directions = [[-1,0],[1,0],[0,-1],[0,1],[1,1],[1,-1],[-1,-1],[-1,1]];
    const endX = tiles[tileColumnCount-1][tileRowCount-1].x;
    const endY = tiles[tileColumnCount-1][tileRowCount-1].y;
    distance[0][0].local  = 0;
    distance[0][0].global = Math.sqrt((endX*endX) + (endY*endY));
    let queue = [];
    queue[0] =[0,0];

    while(queue.length > 0){
     queue.sort( function (a,b){
        return distance[a[0]][a[1]].global - distance[b[0]][b[1]].global;
      });
      const min_co_ordinates = queue.shift();
      const xLoc = min_co_ordinates[0];
      const yLoc = min_co_ordinates[ 1];
      if(xLoc == tileColumnCount-1 && yLoc == tileRowCount-1) break;
      if(xLoc < tileColumnCount-1 || yLoc < tileRowCount-1 && tiles[xLoc][yLoc].state !='v'){
        if(xLoc != 0 || yLoc!=0 )
         tiles[xLoc][yLoc].state = 'v';
        // if(x==23)console.log(x,y);
      for(direction of directions){
        const x = direction[0]  +  xLoc;
        const y =  direction[1] +  yLoc;
      if(x >=0 && y>=0 && x < tileColumnCount && y < tileRowCount && !(tiles[x][y].state == 'w' || tiles[x][y].state =='v')){
        console.log(tiles[x][y].state, x,y);
        if(distance[x][y].local  > distance[xLoc][yLoc].local + Math.sqrt(Math.pow((x-xLoc),2) + Math.pow((y-yLoc),2) )){
          queue.push([x,y]);
          distance[x][y].parent.x = xLoc; distance[x][y].parent.y = yLoc;
          // console.log(x,y); console.log(distance[x][y].parent.x,distance[x][y].parent.y);
          distance[x][y].local  = distance[xLoc][yLoc].local + Math.sqrt(Math.pow((x-xLoc),2) + Math.pow((y-yLoc),2));

          distance[x][y].global = distance[x][y].local +  Math.sqrt(Math.pow((x-endX),2) + Math.pow((y-endY),2));
        }
      }
      }
    }
    }
    followPath(distance,distance[tileColumnCount-1][tileRowCount-1].parent.x , distance[tileColumnCount-1][tileRowCount-1].parent.y);
    console.log(distance[tileColumnCount-1][tileRowCount-1].parent.x , distance[tileColumnCount-1][tileRowCount-1].parent.y );
}


function followPath(distance,parentX , parentY){
  if(parentX == -1 && parentY == -1) return;

  if(parentX!=0 || parentY!=0)
    tiles[parentX][parentY].state = 'x';
  followPath(distance , distance[parentX][parentY].parent.x,distance[parentX][parentY].parent.y);
}






init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;

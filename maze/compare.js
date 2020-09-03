let dfs_canvas;
let astar_canvas;
let dfs_ctx;
let astar_ctx;

const WIDTH = 400;
const HEIGHT = 400;
const tileW  = 20;
const tileH  = 20;

const tileRowCount = 20;
const tileColumnCount = 20;

let dfs_tiles = [];
let astar_tiles = [];
let distance = [];

// initialising the tiles for dfs and astar

for(let c = 0;c<tileColumnCount;c++){
  dfs_tiles[c] = [];
  astar_tiles[c] = [];
  distance[c] = [];
  for(let r=0;r<tileRowCount;r++){
    dfs_tiles[c][r] = {x: c*(tileW + 3),  y : r*(tileH+3),state: 'e'};
    astar_tiles[c][r] ={x: c*(tileW + 3) , y : r*(tileH+3) ,state: 'e'};
    distance[c][r] = {local : Number.MAX_VALUE , global: Number.MAX_VALUE , parent :{x: -1 , y: -1} };

  }
}

init(); // this the start of the program
dfs_canvas.onmousedown = myDown; // for the user to draw
dfs_canvas.onmouseup = myUp; // for the user to draw






//to re-draw the basic canvas for ten seconds
function draw(){
  clear();
 for(let c = 0;c<tileColumnCount;c++){
    for(let r=0;r<tileRowCount;r++){
      rect(dfs_tiles[c][r].x,dfs_tiles[c][r].y,tileW,tileH,dfs_tiles[c][r].state,dfs_ctx);
      rect(astar_tiles[c][r].x,astar_tiles[c][r].y,tileW,tileH,astar_tiles[c][r].state, astar_ctx);

    }
  }

}

// drawing the tiles on the canvas

dfs_tiles[0][0].state = 's';
dfs_tiles[tileColumnCount-1][tileRowCount-1].state = 'f';


astar_tiles[0][0].state = 's';
astar_tiles[tileColumnCount-1][tileRowCount-1].state = 'f';

function rect(x,y,w,h,state,ctx){
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
  dfs_ctx.clearRect(0,0,WIDTH,HEIGHT);
  astar_ctx.clearRect(0,0,WIDTH,HEIGHT);
}

let boundX = 0;
let boundY = 0;
//allowing the user to draw on the canvas
function myDown(e){
dfs_canvas.onmousemove = myMove;
const x = e.pageX - dfs_canvas.offsetLeft;
  const y = e.pageY - dfs_canvas.offsetTop;
  for(let c=0;c<tileColumnCount;c++){
    for(let r=0;r<tileRowCount;r++){
      if(x > c*(tileW+3) && x <c*(tileW+3)+tileW && y > r*(tileH+3) && y < r*(tileH+3)+tileH){
        if(dfs_tiles[c][r].state == 'e' && (c!=boundX || r != boundY)){
          dfs_tiles[c][r].state ='w';
          astar_tiles[c][r].state = 'w';
          boundX = c; boundY = r;
        }
        else if(dfs_tiles[c][r].state == 'w' && (c!=boundX || r != boundY)){
          dfs_tiles[c][r].state ='e';
          astar_tiles[c][r].state ='e';
          boundX = c; boundY = r;
        }
      }
    }
  }
}
function myMove(e){
const x = e.pageX - dfs_canvas.offsetLeft;
const y = e.pageY - dfs_canvas.offsetTop;
  for(let c=0;c<tileColumnCount;c++){
    for(let r=0;r<tileRowCount;r++){
      if(x > c*(tileW+3) && x <c*(tileW+3)+tileW && y > r*(tileH+3) && y < r*(tileH+3)+tileH){
        if(dfs_tiles[c][r].state == 'e' && (c!=boundX || r != boundY)){
          dfs_tiles[c][r].state ='w';
          astar_tiles[c][r].state ='w';
          boundX = c; boundY = r;
        }
        else if(dfs_tiles[c][r].state == 'w' && (c!=boundX || r != boundY)){
          dfs_tiles[c][r].state ='e';
          astar_tiles[c][r].state ='e';
          boundX = c; boundY = r;
        }
      }
    }
  }

}

function myUp(e){
  dfs_canvas.onmousemove = null;
}


//initialising the canvas for dfs and astar
function init(){
  dfs_canvas = document.querySelectorAll(".myCanvas")[0];
  astar_canvas = document.querySelectorAll(".myCanvas")[1];
  dfs_ctx   = dfs_canvas.getContext('2d');
  astar_ctx = astar_canvas.getContext('2d');
  return setInterval(draw, 10);
}


//From this part the maze will be solved


const solveMaze = document.querySelector('.solve');

solveMaze.addEventListener('click',()=>{
  solveMazeDFS();
  solveMazeAstar();
});

function solveMazeDFS(){
  let xQueue = [0];
  let yQueue = [0];
  let pathFound = false;
  let xLoc , yLoc;
    while(xQueue.length >0 && !pathFound){
      xLoc = xQueue.shift();
      yLoc = yQueue.shift();
      if(xLoc>0){
        if(dfs_tiles[xLoc-1][yLoc].state == 'f') pathFound = true;
      }
      if(xLoc<tileColumnCount-1){
        if(dfs_tiles[xLoc+1][yLoc].state == 'f') pathFound = true;
      }
      if(yLoc>0){
        if(dfs_tiles[xLoc][yLoc-1].state == 'f') pathFound = true;
      }
      if(yLoc<tileRowCount-1){
        if(dfs_tiles[xLoc][yLoc+1].state == 'f') pathFound = true;
      }
      if(xLoc<tileColumnCount-1 && yLoc<tileRowCount-1){
        if(dfs_tiles[xLoc+1][yLoc+1].state == 'f') pathFound = true;

      }

      if(xLoc>0){
        if(dfs_tiles[xLoc-1][yLoc].state == 'e') {
            xQueue.push(xLoc-1); yQueue.push(yLoc);
            dfs_tiles[xLoc-1][yLoc].state = dfs_tiles[xLoc][yLoc].state+'l';
        }
      }
      if(xLoc<tileColumnCount-1){
        if(dfs_tiles[xLoc+1][yLoc].state == 'e') {
          xQueue.push(xLoc+1); yQueue.push(yLoc);
          dfs_tiles[xLoc+1][yLoc].state = dfs_tiles[xLoc][yLoc].state+'r';
        }
      }
      if(yLoc>0){
        if(dfs_tiles[xLoc][yLoc-1].state == 'e') {
          xQueue.push(xLoc); yQueue.push(yLoc-1);
          dfs_tiles[xLoc][yLoc-1].state = dfs_tiles[xLoc][yLoc].state+'u';
        }
      }
      if(yLoc<tileRowCount-1){
        if(dfs_tiles[xLoc][yLoc+1].state == 'e') {
          xQueue.push(xLoc); yQueue.push(yLoc+1);
          dfs_tiles[xLoc][yLoc+1].state = dfs_tiles[xLoc][yLoc].state+'d';
        }
      }
    }
    if(!pathFound)
      console.log('NOt FOUND');
    else{
      const path =dfs_tiles[xLoc][yLoc].state;
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
         dfs_tiles[currX][currY].state = 'x';
      }
    }
}
function solveMazeAstar(){
    directions = [[-1,0],[1,0],[0,-1],[0,1],[1,1],[1,-1],[-1,-1],[-1,1]];
    const endX = astar_tiles[tileColumnCount-1][tileRowCount-1].x;
    const endY = astar_tiles[tileColumnCount-1][tileRowCount-1].y;
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
      if(xLoc < tileColumnCount-1 || yLoc < tileRowCount-1 && astar_tiles[xLoc][yLoc].state !='v'){
        if(xLoc != 0 || yLoc!=0 )
         astar_tiles[xLoc][yLoc].state = 'v';
      for(direction of directions){
        const x = direction[0]  +  xLoc;
        const y =  direction[1] +  yLoc;
      if(x >=0 && y>=0 && x < tileColumnCount && y < tileRowCount && !(astar_tiles[x][y].state == 'w' || astar_tiles[x][y].state =='v')){
        if(distance[x][y].local  > distance[xLoc][yLoc].local + Math.sqrt(Math.pow((x-xLoc),2) + Math.pow((y-yLoc),2) )){
          queue.push([x,y]);
          distance[x][y].parent.x = xLoc; distance[x][y].parent.y = yLoc;
          distance[x][y].local  = distance[xLoc][yLoc].local + Math.sqrt(Math.pow((x-xLoc),2) + Math.pow((y-yLoc),2));

          distance[x][y].global = distance[x][y].local +  Math.sqrt(Math.pow((x-endX),2) + Math.pow((y-endY),2));
        }
      }
      }
    }
    }
    followPath(distance,distance[tileColumnCount-1][tileRowCount-1].parent.x , distance[tileColumnCount-1][tileRowCount-1].parent.y);
}


function followPath(distance,parentX , parentY){
  if(parentX == -1 && parentY == -1) return;

  if(parentX!=0 || parentY!=0)
    astar_tiles[parentX][parentY].state = 'x';
  followPath(distance , distance[parentX][parentY].parent.x,distance[parentX][parentY].parent.y);
}

// end of the solve maze portion


// reset code;
const reset = document.querySelector('.reset');
reset.addEventListener('click',()=>{

  for(let c = 0;c<tileColumnCount;c++){
    for(let r=0;r<tileRowCount;r++){
      dfs_tiles[c][r] = {x: c*(tileW + 3),  y : r*(tileH+3),state: 'e'};
      astar_tiles[c][r] ={x: c*(tileW + 3) , y : r*(tileH+3) ,state: 'e'};
      distance[c][r] = {local : Number.MAX_VALUE , global: Number.MAX_VALUE , parent :{x: -1 , y: -1} };

    }
  }
  dfs_tiles[0][0].state = 's';
  dfs_tiles[tileColumnCount-1][tileRowCount-1].state = 'f';

  astar_tiles[0][0].state = 's';
  astar_tiles[tileColumnCount-1][tileRowCount-1].state = 'f';

});

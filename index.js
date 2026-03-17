import {genMaze, drawCell, mazeToString} from "./maze.js"

let maze = 
[[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,],
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,],
[4,4,4,6,6,6,6,6,4,4,4,6,4,4,4,4,6,4,4,4,4,],
[4,4,4,4,4,6,4,4,4,4,4,6,6,4,4,4,6,4,4,4,4,],
[4,4,4,4,4,6,4,4,4,4,4,6,4,6,4,4,6,4,4,4,4,],
[4,4,4,4,4,6,4,4,4,4,4,6,4,4,6,4,6,4,4,4,4,],
[4,4,4,4,4,6,4,4,4,4,4,6,4,4,4,6,6,4,4,4,4,],
[4,4,4,4,4,6,4,4,4,4,4,6,4,4,4,4,6,4,4,4,4,],
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,],
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,]]
// 6 betekent dat het wit moet blijven, 4 dat er en maze komt te staan
let factor        = 20;
let width         = 21;
let height        = 10;
let cellSize      = 6;
let ctx           = document.getElementById("canvas").getContext("2d");
ctx.canvas.width  = (width * (cellSize + 1) + 1) * factor;
ctx.canvas.height = (height * (cellSize + 1) + 1) * factor;
ctx.fillStyle     = "black"; // zou niks moeten doen, maar je weet nooit hè

genMaze(maze)
console.log(mazeToString(maze)) // eigenlijk voor debugging, maar ook wel leuke easteregg
maze.entries().forEach(([y, collumn]) =>
    collumn.entries().forEach(([x, dir]) =>
        drawCell(ctx, cellSize, factor, dir, x, y)
    )
)

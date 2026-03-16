import {genMaze, drawCell, mazeToString} from "./maze.js"

let factor        = 10;
let width         = 21;
let height        = 10;
let cellSize      = 3;
let ctx           = document.getElementById("canvas").getContext("2d");
ctx.canvas.width  = (width * (cellSize + 1) + 1) * factor;
ctx.canvas.height = (height * (cellSize + 1) + 1) * factor;
// ctx.fillStyle     = "green";

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
genMaze(maze)
console.log(mazeToString(maze))
maze.entries().forEach(([y, collumn]) =>
    collumn.entries().forEach(([x, dir]) =>
        drawCell(ctx, cellSize, factor, dir, x, y)
    )
)

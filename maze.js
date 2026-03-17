const [NORTH, EAST, SOUTH, WEST, EMPTY, HOME, WHITE] = [0, 1, 2, 3, 4, 5, 6]

export const mazeToString = (maze) =>
    maze.map(
        (i) => i.map(
            (j) => "↑→↓←*H#"[j]
        ).join(" ")
    ).join("\n"); // haskell zal mij nooit verlaten

export function drawCell(ctx, cellSize, factor, dir, x, y)
{
    if (dir == WHITE) return;
    let startX = (dir == WEST ? 0 : 1) + (cellSize + 1) * x
    let startY = (dir == NORTH ? 0 : 1) + (cellSize + 1) * y
    let width  = (dir % 2 == 1 && dir != HOME ? 1 : 0) + cellSize
    let height = (dir % 2 == 0 ? 1 : 0) + cellSize
    ctx.fillRect(startX * factor,
                 startY * factor,
                 width  * factor,
                 height * factor);
}

function visitedAtDir(maze, pos, dir)
{
    let h = maze.length;
    let w = maze[0].length;

    switch (dir) {
        case NORTH:
            return pos.y == 0     || maze[pos.y - 1][pos.x] != EMPTY;
        case EAST:
            return pos.x == w - 1 || maze[pos.y][pos.x + 1] != EMPTY;
        case SOUTH:
            return pos.y == h - 1 || maze[pos.y + 1][pos.x] != EMPTY;
        case WEST:
            return pos.x == 0     || maze[pos.y][pos.x - 1] != EMPTY;
    }
    return false; // zou hier nooit moeten komen
}

const canMove = (maze, pos) =>
    ![NORTH,EAST,SOUTH,WEST].every((dir) => visitedAtDir(maze, pos, dir));
// niet eens een return nodig, functional is de toekomst

export async function genMaze(ctx, cellSize, factor, maze)
{
    const random = x => Math.floor(Math.random() * x); // di's wel nice
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let h = maze.length
    let w = maze[0].length
    let dir;
    let newDir;
    let pos   = {x: random(w), y: random(h)};
    let stack = [];
    // let maze  = Array(h).fill().map(() => Array(w).fill(4))
    do
        pos = {x: random(w), y: random(h)};
    while (maze[pos.y][pos.x] == WHITE)
    maze[pos.y][pos.x] = HOME;
    drawCell(ctx, cellSize, factor, HOME, pos.x, pos.y);
    
    while (pos != undefined) {
        if (!(canMove(maze, pos))){
            pos = stack.pop();
            continue;
        }
        stack.push(Object.assign({}, pos)); // echt een pesthekel aan deze taal
        // om een kopie te maken van de possition-object

        do
            dir = random(4);
        while (visitedAtDir(maze, pos, dir));

        switch (dir) {
        case NORTH:
            pos.y -= 1;
            break;
        case EAST:
            pos.x += 1;
            break;
        case SOUTH:
            pos.y += 1;
            break;
        case WEST:
            pos.x -= 1;
        }
        newDir = (dir + 2) % 4;
        // de magische som zodat de pijl de andere kant op wijst
        maze[pos.y][pos.x] = newDir;
        await sleep(50)
        drawCell(ctx, cellSize, factor, newDir, pos.x, pos.y);
    }
    return maze;
}

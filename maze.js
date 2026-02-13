// 0: noord, 1: oost, 2: zuid, 3: west, 4: leeg, 5:thuis

const mazeToString = (maze) =>
    maze.map(
        (i) => i.map(
            (j) => "↑→↓←*H"[j]
        ).join(" ")
    ).join("\n"); // haskell zal mij nooit verlaten

function visitedAtDir(maze, pos, dir)
{
    let h = maze.length;
    let w = maze[0].length;

    switch (dir) {
        case 0:
            return pos.y == 0     || maze[pos.y - 1][pos.x] != 4;
        case 1:
            return pos.x == w - 1 || maze[pos.y][pos.x + 1] != 4;
        case 2:
            return pos.y == h - 1 || maze[pos.y + 1][pos.x] != 4;
        case 3:
            return pos.x == 0     || maze[pos.y][pos.x - 1] != 4;
    }
    return false; // zou hier nooit moeten komen
}

const canMove = (maze, pos) =>
    !([0,1,2,3].every((dir) => visitedAtDir(maze, pos, dir))); // niet eens een return nodig, functional is de toekomst

function genMaze(w, h)
{
    const random = x => Math.floor(Math.random() * x); // di's wel nice
    let dir;
    let pos   = {x: random(w), y: random(h)};
    let stack = [];
    let maze  = Array(h).fill().map(() => Array(w).fill(4))
    maze[pos.y][pos.x] = 5;
    
    while (pos != undefined) { // ik haat javascript
        if (!(canMove(maze, pos))){
            pos = stack.pop();
            continue;
        }
        stack.push(Object.assign({}, pos)); // echt een pesthekel aan deze taal

        do {
            dir = random(4);
        } while (visitedAtDir(maze, pos, dir));

        switch (dir) {
        case 0:
            pos.y -= 1;
            break;
        case 1:
            pos.x += 1;
            break;
        case 2:
            pos.y += 1;
            break;
        case 3:
            pos.x -= 1;
        }
        maze[pos.y][pos.x] = (dir + 2) % 4; // de magische som zodat de pijl de andere kant op wijst
    }
    return maze;
}

function main()
{
    let maze = genMaze(10, 10);
    console.log(mazeToString(maze));
}
main();

"use strict";

const favourite = 10;

function isWall(x, y) {
    let value = x*x + 3*x + 2*x*y + y + y*y;
    value += favourite;
    return (Array
        .from(value.toString(2))
        .filter(x=>x=='1')
        .length
         % 2) == 1;
}

for (let i = 0; i < 10; i++) {
    let row = "";
    for (let j = 0; j < 10; j++) {
        row+= isWall(j, i)?'#':'_';
    }
    console.log(row);
}

function getOptions(x,y) {
    return [
        {x: x-1, y: y},
        {x: x, y: y-1},
        {x: x+1, y: y},
        {x: x, y: y+1},
    ].filter(p => p.x >= 0 && p.y >= 0 && !isWall(x,y));
}

let visited = [];

function solve(position, path, end) {

    visited.push(position);

    if (position.x == end.x && position.y == end.y) {
        return path;
    }

    let options = getOptions(position.x, position.y);

    let ret = false;
    options.forEach( o => {
        // console.log(o);
        if (!visited.some(e => e.x == o.x && e.y == o.y)) {
        let p = solve(o, [].concat(path, o), end);
            if (p) {
                ret = p;
            }
        }
    });
    return ret;
}

console.log(solve({x:1,y:1}, [], {x:7, y:4}));

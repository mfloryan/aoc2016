"use strict";

const io = require('./io.js');

function swap(string, x, y) {
    console.log(` ${string} swap: ${x}<->${y}`);
    let ret = Array.from(string);
    let charX = string[x];
    ret[x] = ret[y];
    ret[y] = charX;
    return ret.join('');
}

function swapLetters(string, a, b) {
    console.log(` ${string} swap: ${a}<->${b}`);
    let x = string.indexOf(a);
    let y = string.indexOf(b);
    return swap(string, x, y);
}

function reverse(string, start, end) {
    console.log(` ${string} reverse: ${start}..${end}`);
    let a = Array.from(string);
    let before = a.slice(0,start);
    let inside = a.slice(start,end+1);
    let after = a.slice(end+1);
    let final = before.concat(inside.reverse(), after);
    return final.join('');
}

function rotate(string, direction, offset) {
    console.log(` ${string} rotate: ${direction} ${offset}`);
    let a = Array.from(string);
    offset = offset % a.length;
    let result = [];
    for (let i=0; i < a.length; i++) {
        if (direction == "left")
            result.push(a[(i + offset) % (a.length)]);
        if (direction == "right")
            result.push(a[(i+(a.length - offset)) % a.length]);
    }
    return result.join('');
}

function rotateLetter(string, letter) {
    let rotation = 1 + string.indexOf(letter);
    if (string.indexOf(letter) >= 4) rotation++;
    console.log(` ${string} rotate: ${letter} ${rotation}`);
    return rotate(string, "right", rotation);
}

function move(string, x, y) {
    console.log(` ${string} move: ${x} ${y}`);
    let a = Array.from(string);
    let letter = a.splice(x,1)[0];
    let before = a.slice(0,y);
    let after = a.slice(y);
    return [].concat(before,letter,after).join('');
}

console.log(swap("abcde",4,0) === "ebcda") ;
console.log(swapLetters("ebcda","d","b") === "edcba") ;
console.log(reverse("edcba",0,4) === "abcde");
console.log(reverse("abcde",1,3) === "adcbe");
console.log(rotate('*...','left',1) === "...*");
console.log(rotate('*...','right',1) === ".*.." );
console.log(rotate('1234','left',1) === "2341");
console.log(rotate('1234','right',1) === "4123" );
console.log(rotate('abcde','left',1) === "bcdea" );
console.log(move('bcdea',1,4) === "bdeac");
console.log(move('bdeac',3,0) === "abdec");
console.log(rotateLetter('abdec','b') === "ecabd");
console.log(rotateLetter('ecabd','d') === "decab" );


function parseInput(lines) {
    let ops = [];
    lines.forEach(l => {
        let m = null;
        if (m = l.match(/swap position (.+) with position (.+)/)) {
            ops.push({l, f:swap, a:[m[1], m[2]]} );
        } else if (m = l.match(/swap letter (.) with letter (.)/)) {
            ops.push({l, f:swapLetters, a:[m[1], m[2]]});
        } else if (m = l.match(/rotate based on position of letter (.)/)) {
            ops.push({l, f:rotateLetter, a:[m[1]]});
        } else if (m = l.match(/reverse positions (.) through (.)/)) {
            ops.push({l, f:reverse, a:[m[1], m[2]]});
        } else if (m = l.match(/rotate (.+) (.) steps?/)) {
            ops.push({l, f:rotate, a:[m[1], m[2]]});
        } else if (m = l.match(/move position (.) to position (.)/)) {
            ops.push({l, f:move, a:[m[1], m[2]]});
        }
    });
    return ops;
}

function execute(seed, ops) {
    return ops.reduce((p,c, i) => {
        console.log('== ' + i + ' ================= ');
        console.log(c.l);
        let v = c.f.apply(undefined, [p].concat(c.a));
        console.log('='+v);
        console.log();
        return v;
    }, seed);
}

io.readFromFile('day21.txt')
.then((lines) => {
    let setup = parseInput(lines);
    console.log(execute("abcdefgh", setup));
}).catch(error =>{
    console.log(error);
});

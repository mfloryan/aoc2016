"use strict";

const readline = require('readline');
const fs = require('fs');

let examples = [
    'abba[mnop]qrst',
    'abcd[bddb]xyyx',
    'aaaa[qwer]tyui',
    'ioxxoj[asdfgh]zxcvbn',
    'yhrowrreplrrsbupeor[nchtznfzbzwnogh]rynudxihckzattbz[dshxeaqusdlhydtm]rvqzuffgqtysfzxp'
];

function split(ip7) {
    return ip7.split(/[\[\]]/);
}

function hasAbba(part) {
    for (let i = 0; i < part.length - 3; i++) {
        if (part[i] == part[i + 3] && part[i + 1] == part[i + 2] && part[i] != part[i + 1])
            return true;
    }

    return false;
}

function supportsTls(parts) {
    let abba = parts.map((v, i) => {
        return {
            hn: (i % 2 == 1),
            abba: hasAbba(v)
        };
    });
    let x = abba.filter(e => !e.hn).reduce((p, c) => p || c.abba, false);
    let y = !abba.filter(e => e.hn).reduce((p, c) => p || c.abba, false);
    return x && y;
}

console.log(
    examples.map(e => supportsTls(split(e)))
);

function ReadFromFile(name, whenDone) {
    const rl = readline.createInterface({
        input: fs.createReadStream(name)
    });

    var lines = [];
    rl.on('line', (line) => {
        lines.push(line);
    });

    rl.on('close', () => {
        whenDone(lines);
    });
}

ReadFromFile('day7.txt', (lines) => {
    console.log(lines.length);
    let r = lines.map(e => supportsTls(split(e)));
    console.log(r.length);
    console.log(r.filter(_ => _).length);
});

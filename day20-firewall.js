"use strict";

const io = require('./io.js');

let input = [
    '5-8',
    '0-2',
    '4-7',
];

function comparePair(a,b) {
    return a[0] - b[0];
}

function parseInput(input) {
    return input.map(r => r.split('-').map(i=>Number.parseInt(i)))
    .sort(comparePair);
}

function overlap(first, second) {
    return first[1]+1 >= second[0];
}

function union(first, second) {
    return [ Math.min(first[0], second[0]), Math.max(first[1], second[1]) ];
}

function merge(input) {
    let result = [];
    if (input.length == 1) return input;
    let merges = 0;
    for (let i=0; i < input.length-1; i++) {
        if (overlap(input[i], input[i+1])) {
            result.push(union(input[i], input[i+1]));
            i++;
            merges++;
        } else {
            result.push(input[i]);
            if (i + 2 == input.length) result.push(input[i+1]);
        }
    }
    return {merges, result};
}

io.readFromFile('day20.txt')
.then((lines) => {
    let ranges = parseInput(lines);

    let r = merge(ranges);

    while (r.merges > 0) {
        r = merge(r.result);
    }

    console.log(r.result[0]);
    console.log(r.result[1]);
});
